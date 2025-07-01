"use client";

import { useState, useEffect, useMemo, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Plus,
  Minus,
  Trash2,
  Package,
  Calculator,
  FileText,
  AlertTriangle,
  AlertCircle,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExtractData } from "@/utils/response-type";
import { getAllCategories } from "@/actions/category";
import { getPaginatedProducts, getProductDetail } from "@/actions/product";

const restockSchema = z.object({
  notes: z.string().optional(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().min(1, "Quantity must be at least 1"),
      })
    )
    .min(1, "At least one item is required"),
});

type RestockFormData = z.infer<typeof restockSchema>;

interface RestockItem {
  productId: string;
  quantity: number;
}

interface ReOrderFormProps {
  categories: ExtractData<Awaited<ReturnType<typeof getAllCategories>>>;
  initialProducts: ExtractData<
    Awaited<ReturnType<typeof getPaginatedProducts>>
  >["products"];
}
export function ReOrderForm({ categories, initialProducts }: ReOrderFormProps) {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");

  const [restockItems, setRestockItems] = useState<RestockItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [products, setProducts] = useState(initialProducts);
  const form = useForm<RestockFormData>({
    resolver: zodResolver(restockSchema),
    defaultValues: {
      notes: "",
      items: [],
    },
  });

  useEffect(() => {
    const getProduct = async () => {
      if (!productId) return null;
      const product = await fetchProductById(productId);
      if (!product) return null;
      const suggestedQuantity = Math.max(
        product.lowStockThreshold - product.currentStock,
        10
      );
      setRestockItems([
        {
          productId: product._id.toString(),
          quantity: suggestedQuantity,
        },
      ]);
    };
    getProduct();
  }, [productId]);

  async function fetchProductById(productId: string) {
    const response = await getProductDetail(productId);
    if (!response.success) {
      console.log("Error fetching product:", response.error);
      return null;
    }
    return response.data;
  }

  const addProduct = (product: (typeof products)[0]) => {
    const existingItem = restockItems.find(
      (item) => item.productId === product._id.toString()
    );
    if (existingItem) {
      setRestockItems(
        restockItems.map((item) =>
          item.productId === product._id.toString()
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const suggestedQuantity = Math.max(
        product.lowStockThreshold - product.currentStock,
        1
      );
      setRestockItems([
        ...restockItems,
        {
          productId: product._id.toString(),
          quantity: suggestedQuantity,
        },
      ]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeProduct(productId);
      return;
    }
    setRestockItems(
      restockItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeProduct = (productId: string) => {
    setRestockItems(
      restockItems.filter((item) => item.productId !== productId)
    );
  };

  const getProduct = (productId: string) => {
    return products.find((p) => p._id.toString() === productId);
  };

  const calculateTotal = () => {
    return restockItems.reduce((total, item) => {
      const product = getProduct(item.productId);
      return total + (product ? item.quantity * product.costPrice : 0);
    }, 0);
  };

  const getStockStatus = (product: (typeof products)[0]) => {
    if (product.currentStock === 0) return "out-of-stock";
    if (product.currentStock <= product.lowStockThreshold) return "low-stock";
    return "in-stock";
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const response = await getPaginatedProducts(1, 10, {
      searchTerm: searchQuery,
      category: selectedCategory !== "all" ? selectedCategory : undefined,
    });
    if (!response.success) {
      console.log("Error fetching products:", response.error);
      return [];
    }
    const outOfStock = response.data.products.filter(
      (p) => getStockStatus(p) === "out-of-stock"
    );
    const lowStock = response.data.products.filter(
      (p) => getStockStatus(p) === "low-stock"
    );
    const inStock = response.data.products.filter(
      (p) => getStockStatus(p) === "in-stock"
    );
    setProducts([...outOfStock, ...lowStock, ...inStock]);
  };

  useEffect(() => {
    async function fetchProducts() {
      const response = await getPaginatedProducts(1, 10, {
        searchTerm: searchQuery,
        category: selectedCategory !== "all" ? selectedCategory : undefined,
      });
      if (!response.success) {
        setProducts([]);
        return;
      }
      const outOfStock = response.data.products.filter(
        (p) => getStockStatus(p) === "out-of-stock"
      );
      const lowStock = response.data.products.filter(
        (p) => getStockStatus(p) === "low-stock"
      );
      const inStock = response.data.products.filter(
        (p) => getStockStatus(p) === "in-stock"
      );
      setProducts([...outOfStock, ...lowStock, ...inStock]);
    }
    fetchProducts();
  }, [selectedCategory]);

  const onSubmit = async (data: RestockFormData) => {
    setIsSubmitting(true);
    console.log(data);
    try {
      const restockOrder = {
        ...data,
        items: restockItems,
        totalAmount: calculateTotal(),
        totalItems: restockItems.reduce((sum, item) => sum + item.quantity, 0),
        status: "completed",
        createdAt: new Date().toISOString(),
        restockId: `RST-${Date.now()}`,
      };

      console.log("Restock Order Created:", restockOrder);

      form.reset();
      setRestockItems([]);
      setSearchQuery("");
      setSelectedCategory("all");

      alert("Products restocked successfully!");
    } catch (error) {
      console.error("Error restocking products:", error);
      alert("Error restocking products. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="space-y-6">
          <Card className="border-green-200">
            <CardHeader className="bg-green-50 border-b border-green-200">
              <CardTitle className="text-green-900 flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search & Filter Products
              </CardTitle>
              <CardDescription>Find products to restock</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                  <div>
                    <Label className="text-green-900 font-medium">
                      Search Products
                    </Label>
                    <div className="relative mt-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by name, SKU, or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 border-green-300 focus:border-green-500"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-green-900 font-medium">
                      Filter by Category
                    </Label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="mt-1 border-green-300 focus:border-green-500 w-full">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem
                            key={category._id.toString()}
                            value={category._id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full">Search</Button>
              </form>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  Showing {products.length} of {products.length} products
                </span>
                {(searchQuery || selectedCategory !== "all") && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    className="text-green-600 hover:text-green-700"
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="bg-green-50 border-b border-green-200">
              <CardTitle className="text-green-900 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Select Products to Restock
              </CardTitle>
              <CardDescription>
                {products.length === 0
                  ? "No products match your search criteria"
                  : "Choose products that need restocking"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {products.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No products found</p>
                  <p className="text-sm">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((product) => {
                    const stockStatus = getStockStatus(product);
                    const isSelected = restockItems.some(
                      (item) => item.productId === product._id.toString()
                    );

                    return (
                      <div
                        key={product._id.toString()}
                        className={`border rounded-lg p-4 transition-colors ${
                          stockStatus === "out-of-stock"
                            ? "border-red-300 bg-red-50"
                            : stockStatus === "low-stock"
                            ? "border-yellow-300 bg-yellow-50"
                            : "border-green-200 hover:bg-green-50"
                        } ${isSelected ? "ring-2 ring-green-500" : ""}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-green-900">
                                {product.name}
                              </h4>
                              {stockStatus === "out-of-stock" && (
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                              )}
                              {stockStatus === "low-stock" && (
                                <AlertCircle className="h-4 w-4 text-yellow-500" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              SKU: {product.sku}
                            </p>
                            <p className="text-sm text-gray-600">
                              {product.category.name}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={
                                stockStatus === "out-of-stock"
                                  ? "destructive"
                                  : stockStatus === "low-stock"
                                  ? "secondary"
                                  : "default"
                              }
                              className={
                                stockStatus === "low-stock"
                                  ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                                  : ""
                              }
                            >
                              {product.currentStock} {product.unit}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">
                              Min: {product.lowStockThreshold} {product.unit}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-green-700">
                            ${product.costPrice.toFixed(2)} per {product.unit}
                          </span>
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => addProduct(product)}
                            className="bg-green-600 hover:bg-green-700"
                            disabled={isSelected}
                          >
                            {isSelected ? (
                              "Added"
                            ) : (
                              <>
                                <Plus className="h-4 w-4 mr-1" />
                                Add
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="bg-green-50 border-b border-green-200">
              <CardTitle className="text-green-900 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Additional Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-green-900 font-medium">
                          Notes (Optional)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add any notes about this restock operation..."
                            className="border-green-300 focus:border-green-500"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Any additional information about this restock
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || restockItems.length === 0}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? "Processing Restock..." : "Restock Products"}
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6 ">
        <Card className="border-green-200">
          <CardHeader className="bg-green-50 border-b border-green-200">
            <CardTitle className="text-green-900 flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Restock Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {restockItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No items selected</p>
                <p className="text-sm">
                  Add products to see the restock summary
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {restockItems.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;

                  const stockStatus = getStockStatus(product);
                  const totalCost = item.quantity * product.costPrice;

                  return (
                    <div
                      key={item.productId}
                      className="border border-green-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-green-900">
                              {product.name}
                            </h4>
                            {stockStatus === "out-of-stock" && (
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            )}
                            {stockStatus === "low-stock" && (
                              <AlertCircle className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            SKU: {product.sku}
                          </p>
                          <p className="text-sm text-gray-600">
                            Current: {product.currentStock} {product.unit}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProduct(item.productId)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium text-green-900">
                            Quantity to Add
                          </Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity - 1
                                )
                              }
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.productId,
                                  Number.parseInt(e.target.value) || 0
                                )
                              }
                              className="w-20 text-center border-green-300 focus:border-green-500"
                              min="1"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <span className="text-sm text-gray-600">
                              {product.unit}
                            </span>
                          </div>
                        </div>

                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="flex justify-between text-sm">
                            <span className="text-green-700">Unit Cost:</span>
                            <span className="font-medium">
                              ${product.costPrice.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-green-700">
                              New Stock Level:
                            </span>
                            <span className="font-medium">
                              {product.currentStock + item.quantity}{" "}
                              {product.unit}
                            </span>
                          </div>
                        </div>

                        <Separator />

                        <div className="flex justify-between items-center font-medium">
                          <span className="text-green-900">Subtotal:</span>
                          <span className="text-green-700">
                            ${totalCost.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <Separator />

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center text-lg font-bold text-green-900">
                    <span>Total Cost:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    {restockItems.length} product
                    {restockItems.length !== 1 ? "s" : ""} •{" "}
                    {restockItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                    units
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
