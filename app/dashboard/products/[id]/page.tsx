"use client";

import {
  ArrowLeft,
  Calendar,
  Edit,
  Eye,
  Package,
  Plus,
  Trash2,
  TrendingDown,
  TrendingUp,
  Truck,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const productData = {
  id: "PRD-001",
  name: "Wireless Bluetooth Headphones Pro",
  sku: "WBH-PRO-2024",
  description:
    "Premium wireless Bluetooth headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals.",
  category: "Electronics",
  subcategory: "Audio Equipment",
  brand: "TechSound",
  model: "TS-WBH-Pro",
  price: 299.99,
  costPrice: 180.0,
  currency: "USD",
  status: "Active",
  stockLevel: 45,
  minStockLevel: 10,
  maxStockLevel: 100,
  reorderPoint: 15,
  supplier: {
    name: "Tech Wholesale Inc.",
    contact: "supplier@techwholesale.com",
    phone: "+1 (555) 123-4567",
  },

  createdAt: "2024-01-15",
  updatedAt: "2024-12-19",
  tags: ["Premium", "Wireless", "Noise Cancelling", "Bluetooth 5.0"],
};

const stockHistory = [
  {
    date: "2024-12-19",
    type: "Sale",
    quantity: -5,
    balance: 45,
    reference: "ORD-287",
  },
  {
    date: "2024-12-18",
    type: "Restock",
    quantity: +25,
    balance: 50,
    reference: "PO-156",
  },
  {
    date: "2024-12-17",
    type: "Sale",
    quantity: -3,
    balance: 25,
    reference: "ORD-285",
  },
  {
    date: "2024-12-16",
    type: "Adjustment",
    quantity: -2,
    balance: 28,
    reference: "ADJ-045",
  },
  {
    date: "2024-12-15",
    type: "Sale",
    quantity: -7,
    balance: 30,
    reference: "ORD-284",
  },
  {
    date: "2024-12-14",
    type: "Sale",
    quantity: -4,
    balance: 37,
    reference: "ORD-283",
  },
  {
    date: "2024-12-13",
    type: "Restock",
    quantity: +20,
    balance: 41,
    reference: "PO-155",
  },
];

const salesData = [
  { period: "This Week", quantity: 12, revenue: 3599.88 },
  { period: "This Month", quantity: 48, revenue: 14399.52 },
  { period: "Last Month", quantity: 52, revenue: 15599.48 },
  { period: "This Quarter", quantity: 156, revenue: 46799.44 },
];

export default function ViewProductPage({}: { params: { id: string } }) {
  const router = useRouter();

  const stockPercentage =
    (productData.stockLevel / productData.maxStockLevel) * 100;
  const profitMargin =
    ((productData.price - productData.costPrice) / productData.price) * 100;

  return (
    <div className="w-full ">
      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <div>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                  {productData.name}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>SKU: {productData.sku}</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>ID: {productData.id}</span>
                  <Separator orientation="vertical" className="h-4" />
                  <Badge
                    variant={
                      productData.status === "Active" ? "default" : "secondary"
                    }
                    className="bg-green-100 text-green-700"
                  >
                    {productData.status}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    More Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Duplicate Product</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Package className="mr-2 h-4 w-4" />
                    <span>Adjust Stock</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Truck className="mr-2 h-4 w-4" />
                    <span>Create Purchase Order</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete Product</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid gap-6 ">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="w-full justify-start overflow-x-auto">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory</TabsTrigger>
                  <TabsTrigger value="sales">Sales</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Description
                          </label>
                          <p className="mt-1 text-sm">
                            {productData.description}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">
                              Category
                            </label>
                            <p className="mt-1 text-sm font-medium">
                              {productData.category}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">
                              Subcategory
                            </label>
                            <p className="mt-1 text-sm font-medium">
                              {productData.subcategory}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">
                              Brand
                            </label>
                            <p className="mt-1 text-sm font-medium">
                              {productData.brand}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">
                              Model
                            </label>
                            <p className="mt-1 text-sm font-medium">
                              {productData.model}
                            </p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Tags
                          </label>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {productData.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="bg-green-100 text-green-700"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Pricing & Profitability</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">
                              Selling Price
                            </label>
                            <p className="mt-1 text-2xl font-bold text-green-600">
                              ${productData.price.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">
                              Cost Price
                            </label>
                            <p className="mt-1 text-lg font-medium">
                              ${productData.costPrice.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Profit Margin
                          </label>
                          <div className="mt-1 flex items-center gap-2">
                            <Progress value={profitMargin} className="flex-1" />
                            <span className="text-sm font-medium text-green-600">
                              {profitMargin.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Profit per Unit
                          </label>
                          <p className="mt-1 text-lg font-medium text-green-600">
                            $
                            {(
                              productData.price - productData.costPrice
                            ).toFixed(2)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Supplier Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Supplier Name
                          </label>
                          <p className="mt-1 text-sm font-medium">
                            {productData.supplier.name}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Contact Email
                          </label>
                          <p className="mt-1 text-sm font-medium">
                            {productData.supplier.contact}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Phone
                          </label>
                          <p className="mt-1 text-sm font-medium">
                            {productData.supplier.phone}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="inventory" className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Stock Levels</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-500">
                              Current Stock
                            </label>
                            <span className="text-2xl font-bold text-green-600">
                              {productData.stockLevel}
                            </span>
                          </div>
                          <div className="mt-2">
                            <Progress value={stockPercentage} className="h-2" />
                            <div className="mt-1 flex justify-between text-xs text-gray-500">
                              <span>Min: {productData.minStockLevel}</span>
                              <span>Max: {productData.maxStockLevel}</span>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">
                              Reorder Point
                            </label>
                            <p className="mt-1 text-lg font-medium">
                              {productData.reorderPoint}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">
                              Stock Status
                            </label>
                            <Badge
                              variant={
                                productData.stockLevel >
                                productData.reorderPoint
                                  ? "default"
                                  : "destructive"
                              }
                              className={
                                productData.stockLevel >
                                productData.reorderPoint
                                  ? "bg-green-100 text-green-700"
                                  : ""
                              }
                            >
                              {productData.stockLevel > productData.reorderPoint
                                ? "In Stock"
                                : "Low Stock"}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Stock Value</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Total Value (Selling Price)
                          </label>
                          <p className="mt-1 text-2xl font-bold text-green-600">
                            $
                            {(
                              productData.stockLevel * productData.price
                            ).toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Total Cost Value
                          </label>
                          <p className="mt-1 text-lg font-medium">
                            $
                            {(
                              productData.stockLevel * productData.costPrice
                            ).toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Potential Profit
                          </label>
                          <p className="mt-1 text-lg font-medium text-green-600">
                            $
                            {(
                              productData.stockLevel *
                              (productData.price - productData.costPrice)
                            ).toFixed(2)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>{" "}
                </TabsContent>

                <TabsContent value="sales" className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {salesData.map((period) => (
                      <Card key={period.period}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            {period.period}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div>
                              <p className="text-2xl font-bold">
                                {period.quantity}
                              </p>
                              <p className="text-xs text-gray-500">
                                Units Sold
                              </p>
                            </div>
                            <div>
                              <p className="text-lg font-medium text-green-600">
                                ${period.revenue.toFixed(2)}
                              </p>
                              <p className="text-xs text-gray-500">Revenue</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Sales Performance</CardTitle>
                      <CardDescription>
                        Sales trend over the last 6 months
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full rounded-md bg-green-50 p-4">
                        <div className="flex h-full w-full flex-col justify-between rounded-md border border-dashed border-green-200 p-4">
                          <div className="space-y-2">
                            <div className="h-2 w-20 rounded bg-green-500/70"></div>
                            <div className="h-32 w-full rounded-md bg-green-500/20">
                              <div className="relative h-full w-full">
                                <div className="absolute bottom-0 left-0 right-0 h-20 rounded-md bg-green-500/30"></div>
                                <div className="absolute bottom-0 left-[10%] right-[70%] h-16 rounded-md bg-green-500/40"></div>
                                <div className="absolute bottom-0 left-[20%] right-[60%] h-24 rounded-md bg-green-500/50"></div>
                                <div className="absolute bottom-0 left-[30%] right-[50%] h-18 rounded-md bg-green-500/60"></div>
                                <div className="absolute bottom-0 left-[40%] right-[40%] h-14 rounded-md bg-green-500/70"></div>
                                <div className="absolute bottom-0 left-[50%] right-[30%] h-22 rounded-md bg-green-500/80"></div>
                                <div className="absolute bottom-0 left-[60%] right-[20%] h-28 rounded-md bg-green-500/90"></div>
                                <div className="absolute bottom-0 left-[70%] right-[10%] h-26 rounded-md bg-green-500"></div>
                                <div className="absolute bottom-0 left-[80%] right-0 h-30 rounded-md bg-green-600"></div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <div>Jul</div>
                            <div>Aug</div>
                            <div>Sep</div>
                            <div>Oct</div>
                            <div>Nov</div>
                            <div>Dec</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Stock Movement History</CardTitle>
                      <CardDescription>
                        Recent stock transactions and adjustments
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {stockHistory.map((transaction, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between rounded-lg border p-3"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                  transaction.type === "Sale"
                                    ? "bg-red-100"
                                    : transaction.type === "Restock"
                                    ? "bg-green-100"
                                    : "bg-blue-100"
                                }`}
                              >
                                {transaction.type === "Sale" ? (
                                  <TrendingDown
                                    className={`h-5 w-5 ${
                                      transaction.type === "Sale"
                                        ? "text-red-600"
                                        : "text-green-600"
                                    }`}
                                  />
                                ) : transaction.type === "Restock" ? (
                                  <TrendingUp className="h-5 w-5 text-green-600" />
                                ) : (
                                  <Package className="h-5 w-5 text-blue-600" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">
                                  {transaction.type}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {transaction.date} • Ref:{" "}
                                  {transaction.reference}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p
                                className={`text-lg font-bold ${
                                  transaction.quantity > 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {transaction.quantity > 0 ? "+" : ""}
                                {transaction.quantity}
                              </p>
                              <p className="text-sm text-gray-500">
                                Balance: {transaction.balance}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Product Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                            <Calendar className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Product Created</p>
                            <p className="text-sm text-gray-500">
                              {productData.createdAt}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                            <Edit className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Last Updated</p>
                            <p className="text-sm text-gray-500">
                              {productData.updatedAt}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
