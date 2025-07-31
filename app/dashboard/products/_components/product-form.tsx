"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Check, ChevronsUpDown, Save } from "lucide-react";
import { cn } from "@/lib/utils";

import { productSchema } from "@/schema/product";
import { z } from "zod";
import { ISupplier } from "@/models/supplier";
import { getAllCategories } from "@/actions/category";
import {
  addNewProduct,
  getProductDetail,
  updateProduct,
} from "@/actions/product";
import type { ExtractData } from "@/utils/response-type";

const inititalValues: ProductFormData = {
  name: "",
  sku: "",
  barcode: "",
  categoryId: "",
  supplierId: "",
  brand: "",
  description: "",
  unit: "pieces",
  costPrice: "",
  sellingPrice: "",
  discountPrice: "",
  initialStock: "",
  lowStockThreshold: "",
  weight: "",
  dimensions: "",
  isPerishable: false,
  isActive: true,
  trackInventory: true,
  requiresRefrigeration: false,
  isOrganic: false,
};

type ProductFormData = z.infer<typeof productSchema>;

type ProductFormProps = {
  suppliers: ISupplier[];
  categories: ExtractData<Awaited<ReturnType<typeof getAllCategories>>>;
  product?: ExtractData<Awaited<ReturnType<typeof getProductDetail>>>;
};

export function ProductForm(props: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [supplierOpen, setSupplierOpen] = useState(false);
  const { suppliers, categories } = props;
  const [error, setError] = useState("");

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: props.product
      ? {
          name: props.product.name,
          sku: props.product.sku,
          barcode: props.product.barcode || "",
          brand: props.product.brand || "",
          description: props.product.description || "",
          unit: props.product.unit || "pieces",
          costPrice: props.product.costPrice.toString(),
          sellingPrice: props.product.sellingPrice.toString(),
          discountPrice: props.product.discountPrice?.toString() || "",
          initialStock: props.product.initialStock.toString(),
          lowStockThreshold: props.product.lowStockThreshold.toString(),
          weight: props.product.weight?.toString() || "",
          dimensions: props.product.dimensions || "",
          isPerishable: props.product.isPerishable || false,
          isActive: props.product.isActive || true,
          trackInventory: props.product.trackInventory || true,
          requiresRefrigeration: props.product.requiresRefrigeration || false,
          isOrganic: props.product.isOrganic || false,
          supplierId: props.product.supplier._id.toString(),
          categoryId: props.product.category._id.toString(),
        }
      : inititalValues,
  });

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    setError("");
    try {
      if (props.product) {
        const result = await updateProduct(props.product._id.toString(), data);
        if (!result.success) {
          setError(result.error);
          return;
        }
        setError("");
        router.push("/dashboard/products?success=true");
      }
      const result = await addNewProduct(data);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setError("");
      router.push("/dashboard/products?success=true");
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/products");
  };

  const selectedSupplier = suppliers.find(
    (sup) => sup._id.toString() === form.watch("supplierId")
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="border-green-200">
          <CardHeader className="pb-6">
            <CardTitle className="text-green-900">Basic Information</CardTitle>
            <CardDescription className="text-green-700">
              Enter the basic details of your product
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-green-900 font-medium">
                      Product Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter product name"
                        className="border-green-200 focus:border-green-400 focus:ring-green-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-green-900 font-medium">
                      SKU *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter SKU"
                        className="border-green-200 focus:border-green-400 focus:ring-green-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-green-900 font-medium">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description"
                      className="border-green-200 focus:border-green-400 focus:ring-green-400 min-h-[100px]"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-green-900 font-medium">
                      Category *
                    </FormLabel>
                    <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between border-green-200 focus:border-green-400 focus:ring-green-400"
                          >
                            {field.value
                              ? categories.find(
                                  (category) =>
                                    category._id.toString() === field.value
                                )?.name
                              : "Select category..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search categories..." />
                          <CommandList>
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup>
                              {categories.map((category) => (
                                <CommandItem
                                  key={category._id.toString()}
                                  value={`${category.name} ${category._id}`}
                                  onSelect={() => {
                                    form.setValue(
                                      "categoryId",
                                      category._id.toString()
                                    );
                                    setCategoryOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      category._id.toString() === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  <div>
                                    <div className="font-medium">
                                      {category.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      ID: {category._id.toString()}
                                    </div>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="supplierId"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-green-900 font-medium">
                      Supplier
                    </FormLabel>
                    <Popover open={supplierOpen} onOpenChange={setSupplierOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between border-green-200 focus:border-green-400 focus:ring-green-400"
                          >
                            {field.value
                              ? suppliers.find(
                                  (supplier) =>
                                    supplier._id.toString() === field.value
                                )?.name
                              : "Select supplier..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search suppliers..." />
                          <CommandList>
                            <CommandEmpty>No supplier found.</CommandEmpty>
                            <CommandGroup>
                              {suppliers.map((supplier) => (
                                <CommandItem
                                  key={supplier._id.toString()}
                                  value={`${
                                    supplier.name
                                  } ${supplier._id.toString()}`}
                                  onSelect={() => {
                                    form.setValue(
                                      "supplierId",
                                      supplier._id.toString()
                                    );
                                    setSupplierOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      supplier._id.toString() === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  <div>
                                    <div className="font-medium">
                                      {supplier.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      ID: {supplier._id.toString()} •{" "}
                                      {supplier.contactPerson}
                                    </div>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-green-900 font-medium">
                      Brand
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter brand"
                        className="border-green-200 focus:border-green-400 focus:ring-green-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="barcode"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-green-900 font-medium">
                      Barcode
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter barcode"
                        className="border-green-200 focus:border-green-400 focus:ring-green-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-green-900 font-medium">
                      Unit *
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-green-200 focus:border-green-400 focus:ring-green-400">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pieces">Pieces</SelectItem>
                        <SelectItem value="kg">Kilograms</SelectItem>
                        <SelectItem value="g">Grams</SelectItem>
                        <SelectItem value="l">Liters</SelectItem>
                        <SelectItem value="ml">Milliliters</SelectItem>
                        <SelectItem value="pack">Pack</SelectItem>
                        <SelectItem value="box">Box</SelectItem>
                        <SelectItem value="dozen">Dozen</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="pb-6">
            <CardTitle className="text-green-900">Pricing</CardTitle>
            <CardDescription className="text-green-700">
              Set the pricing information for this product
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="costPrice"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-green-900 font-medium">
                      Cost Price *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="border-green-200 focus:border-green-400 focus:ring-green-400"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-green-600">
                      Your cost to purchase this item
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sellingPrice"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-green-900 font-medium">
                      Selling Price *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="border-green-200 focus:border-green-400 focus:ring-green-400"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-green-600">
                      Regular selling price to customers
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discountPrice"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-green-900 font-medium">
                      Discount Price
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="border-green-200 focus:border-green-400 focus:ring-green-400"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-green-600">
                      Sale or promotional price (optional)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {form.watch("costPrice") && form.watch("sellingPrice") && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800">
                  <div>
                    <strong>Profit Margin:</strong>{" "}
                    {(
                      ((Number(form.watch("sellingPrice")) -
                        Number(form.watch("costPrice"))) /
                        Number(form.watch("sellingPrice"))) *
                      100
                    ).toFixed(2)}
                    %
                  </div>
                  <div>
                    <strong>Profit per Unit:</strong> $
                    {(
                      Number(form.watch("sellingPrice")) -
                      Number(form.watch("costPrice"))
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="pb-6">
            <CardTitle className="text-green-900">Inventory</CardTitle>
            <CardDescription className="text-green-700">
              Manage stock levels and inventory settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="initialStock"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-green-900 font-medium">
                      Initial Stock *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className="border-green-200 focus:border-green-400 focus:ring-green-400"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-green-600">
                      Starting quantity in inventory
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lowStockThreshold"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-green-900 font-medium">
                      Low Stock Threshold *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="10"
                        className="border-green-200 focus:border-green-400 focus:ring-green-400"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-green-600">
                      Alert when stock falls below this level
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-green-900 font-medium">
                      Weight (kg)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="border-green-200 focus:border-green-400 focus:ring-green-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dimensions"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-green-900 font-medium">
                      Dimensions
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 10cm x 5cm x 3cm"
                        className="border-green-200 focus:border-green-400 focus:ring-green-400"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-green-600">
                      Product dimensions for shelf planning
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="pb-6">
            <CardTitle className="text-green-900">Product Settings</CardTitle>
            <CardDescription className="text-green-700">
              Configure product characteristics and settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-green-900 font-medium">
                        Active Product
                      </FormLabel>
                      <FormDescription className="text-green-600">
                        Product is available for sale
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="trackInventory"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-green-900 font-medium">
                        Track Inventory
                      </FormLabel>
                      <FormDescription className="text-green-600">
                        Monitor stock levels for this product
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPerishable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-green-900 font-medium">
                        Perishable Item
                      </FormLabel>
                      <FormDescription className="text-green-600">
                        This product has an expiration date
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requiresRefrigeration"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-green-900 font-medium">
                        Requires Refrigeration
                      </FormLabel>
                      <FormDescription className="text-green-600">
                        Must be stored in refrigerated section
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isOrganic"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-green-900 font-medium">
                        Organic Product
                      </FormLabel>
                      <FormDescription className="text-green-600">
                        Certified organic product
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {selectedSupplier && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-4">
              <CardTitle className="text-blue-900 text-lg">
                Selected Supplier Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                <div>
                  <strong>Contact Person:</strong>{" "}
                  {selectedSupplier.contactPerson}
                </div>
                <div>
                  <strong>Email:</strong> {selectedSupplier.email}
                </div>
                <div>
                  <strong>Phone:</strong> {selectedSupplier.phone}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        <div>{error}</div>
        <div className="flex justify-end space-x-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>

                {props.product ? "Updating Product..." : "Adding Product..."}
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {props.product ? "Update Product" : "Add Product"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
