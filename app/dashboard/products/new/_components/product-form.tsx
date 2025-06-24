"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const categories = [
  {
    id: 1,
    name: "Fresh Produce",
    description: "Fruits and vegetables",
    isActive: true,
    taxRate: 0.05,
    color: "bg-green-50 border-green-200",
  },
  {
    id: 2,
    name: "Dairy & Eggs",
    description: "Milk, cheese, yogurt, eggs",
    isActive: true,
    taxRate: 0.08,
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: 3,
    name: "Meat & Seafood",
    description: "Fresh and frozen meat, fish",
    isActive: true,
    taxRate: 0.1,
    color: "bg-red-50 border-red-200",
  },
  {
    id: 4,
    name: "Bakery",
    description: "Bread, pastries, cakes",
    isActive: true,
    taxRate: 0.08,
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    id: 5,
    name: "Frozen Foods",
    description: "Frozen meals, ice cream",
    isActive: true,
    taxRate: 0.08,
    color: "bg-cyan-50 border-cyan-200",
  },
  {
    id: 6,
    name: "Beverages",
    description: "Soft drinks, juices, water",
    isActive: true,
    taxRate: 0.12,
    color: "bg-purple-50 border-purple-200",
  },
  {
    id: 7,
    name: "Snacks & Candy",
    description: "Chips, cookies, chocolate",
    isActive: true,
    taxRate: 0.15,
    color: "bg-orange-50 border-orange-200",
  },
  {
    id: 8,
    name: "Household Items",
    description: "Cleaning supplies, paper goods",
    isActive: true,
    taxRate: 0.1,
    color: "bg-gray-50 border-gray-200",
  },
];

const suppliers = [
  {
    id: 1,
    name: "Fresh Farm Co.",
    contactPerson: "John Smith",
    email: "john@freshfarm.com",
    phone: "(555) 123-4567",
    paymentTerms: "Net 15",
    isActive: true,
  },
  {
    id: 2,
    name: "Dairy Direct Ltd.",
    contactPerson: "Sarah Johnson",
    email: "sarah@dairydirect.com",
    phone: "(555) 234-5678",
    paymentTerms: "Net 30",
    isActive: true,
  },
  {
    id: 3,
    name: "Ocean Fresh Seafood",
    contactPerson: "Mike Wilson",
    email: "mike@oceanfresh.com",
    phone: "(555) 345-6789",
    paymentTerms: "Net 7",
    isActive: true,
  },
  {
    id: 4,
    name: "Golden Bakery Supply",
    contactPerson: "Lisa Brown",
    email: "lisa@goldenbakery.com",
    phone: "(555) 456-7890",
    paymentTerms: "Net 15",
    isActive: true,
  },
  {
    id: 5,
    name: "Frozen Foods Inc.",
    contactPerson: "David Lee",
    email: "david@frozenfoods.com",
    phone: "(555) 567-8901",
    paymentTerms: "Net 30",
    isActive: true,
  },
  {
    id: 6,
    name: "Beverage Distributors",
    contactPerson: "Emma Davis",
    email: "emma@bevdist.com",
    phone: "(555) 678-9012",
    paymentTerms: "Net 15",
    isActive: true,
  },
];

const productSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be less than 100 characters"),
  sku: z
    .string()
    .min(3, "SKU must be at least 3 characters")
    .max(50, "SKU must be less than 50 characters"),
  barcode: z.string().optional().or(z.literal("")),
  categoryId: z.string().min(1, "Please select a category"),
  supplierId: z.string().optional().or(z.literal("")),
  brand: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  unit: z.string().min(1, "Unit is required"),

  // Pricing
  costPrice: z
    .string()
    .min(1, "Cost price is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Cost price must be a positive number"
    ),
  sellingPrice: z
    .string()
    .min(1, "Selling price is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Selling price must be a positive number"
    ),
  discountPrice: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || (!isNaN(Number(val)) && Number(val) >= 0),
      "Discount price must be a positive number"
    ),

  initialStock: z
    .string()
    .min(1, "Initial stock is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Initial stock must be a non-negative number"
    ),
  lowStockThreshold: z
    .string()
    .min(1, "Low stock threshold is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Low stock threshold must be a non-negative number"
    ),

  weight: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || (!isNaN(Number(val)) && Number(val) > 0),
      "Weight must be a positive number"
    ),
  dimensions: z.string().optional().or(z.literal("")),

  isPerishable: z.boolean(),
  isActive: z.boolean(),
  trackInventory: z.boolean(),
  requiresRefrigeration: z.boolean(),
  isOrganic: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

export function ProductForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [supplierOpen, setSupplierOpen] = useState(false);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
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
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);

    try {
      console.log(data);
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

  const selectedCategory = categories.find(
    (cat) => cat.id.toString() === form.watch("categoryId")
  );
  const selectedSupplier = suppliers.find(
    (sup) => sup.id.toString() === form.watch("supplierId")
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
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
                                    category.id.toString() === field.value
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
                                  key={category.id}
                                  value={`${category.name} ${category.id}`}
                                  onSelect={() => {
                                    form.setValue(
                                      "categoryId",
                                      category.id.toString()
                                    );
                                    setCategoryOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      category.id.toString() === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  <div>
                                    <div className="font-medium">
                                      {category.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      ID: {category.id} • Tax:{" "}
                                      {(category.taxRate * 100).toFixed(1)}%
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
                                    supplier.id.toString() === field.value
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
                                  key={supplier.id}
                                  value={`${supplier.name} ${supplier.id}`}
                                  onSelect={() => {
                                    form.setValue(
                                      "supplierId",
                                      supplier.id.toString()
                                    );
                                    setSupplierOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      supplier.id.toString() === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  <div>
                                    <div className="font-medium">
                                      {supplier.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      ID: {supplier.id} •{" "}
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

        {/* Pricing */}
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

            {/* Profit Margin & Tax Display */}
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
                  {selectedCategory && (
                    <>
                      <div>
                        <strong>Tax Amount:</strong> $
                        {(
                          Number(form.watch("sellingPrice")) *
                          selectedCategory.taxRate
                        ).toFixed(2)}
                      </div>
                      <div>
                        <strong>Final Price (incl. tax):</strong> $
                        {(
                          Number(form.watch("sellingPrice")) *
                          (1 + selectedCategory.taxRate)
                        ).toFixed(2)}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Inventory */}
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

        {/* Product Settings */}
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

        {/* Display selected supplier info */}
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
                <div>
                  <strong>Payment Terms:</strong>{" "}
                  {selectedSupplier.paymentTerms}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Buttons */}
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
                Adding Product...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Add Product
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
