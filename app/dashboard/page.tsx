import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Box,
  Clock,
  DollarSign,
  ShoppingCart,
  Truck,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <main className="flex-1 overflow-auto p-4 md:p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-green-900">
            Dashboard
          </h1>
          <p className="text-gray-500">
            Welcome back, Admin! Here&apos;s what&apos;s happening with your
            inventory today.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-green-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Products
              </CardTitle>
              <Box className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">2,345</div>
              <p className="text-xs text-gray-500">+12% from last month</p>
              <div className="mt-4">
                <Progress
                  value={75}
                  className="h-2 bg-green-100"
                  indicatorClassName="bg-green-600"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Low Stock Items
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">42</div>
              <p className="text-xs text-gray-500">+5 since yesterday</p>
              <div className="mt-4">
                <Progress
                  value={42}
                  className="h-2 bg-green-100"
                  indicatorClassName="bg-amber-500"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Pending Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">18</div>
              <p className="text-xs text-gray-500">-3 from yesterday</p>
              <div className="mt-4">
                <Progress
                  value={18}
                  className="h-2 bg-green-100"
                  indicatorClassName="bg-green-600"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Revenue (Month)
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">$24,780</div>
              <p className="text-xs text-green-600">+8.2% from last month</p>
              <div className="mt-4">
                <Progress
                  value={68}
                  className="h-2 bg-green-100"
                  indicatorClassName="bg-green-600"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Tables */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Inventory Overview */}
          <Card className="border-green-200 bg-white shadow-sm lg:col-span-4">
            <CardHeader>
              <CardTitle className="text-green-900">
                Inventory Overview
              </CardTitle>
              <CardDescription>
                Monthly inventory levels and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chart">
                <TabsList className="mb-4 grid w-full grid-cols-2 bg-green-100">
                  <TabsTrigger
                    value="chart"
                    className="data-[state=active]:bg-white data-[state=active]:text-green-900"
                  >
                    Chart
                  </TabsTrigger>
                  <TabsTrigger
                    value="breakdown"
                    className="data-[state=active]:bg-white data-[state=active]:text-green-900"
                  >
                    Breakdown
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="chart">
                  <div className="h-[300px] w-full rounded-md border border-green-200 bg-green-50 p-4">
                    <div className="flex h-full flex-col items-center justify-center gap-2">
                      <BarChart3 className="h-16 w-16 text-green-300" />
                      <p className="text-sm text-green-800">
                        Inventory Levels by Category
                      </p>
                      <div className="mt-4 grid w-full grid-cols-5 gap-2">
                        {[65, 40, 85, 30, 55].map((value, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div className="relative h-[150px] w-full">
                              <div
                                className="absolute bottom-0 w-full rounded-t-sm bg-green-600"
                                style={{ height: `${value}%` }}
                              ></div>
                            </div>
                            <span className="mt-2 text-xs text-green-800">
                              Cat {i + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="breakdown">
                  <div className="space-y-4">
                    {[
                      { category: "Electronics", count: 845, percentage: 96 },
                      { category: "Furniture", count: 512, percentage: 22 },
                      { category: "Clothing", count: 738, percentage: 31 },
                      { category: "Kitchen", count: 250, percentage: 11 },
                    ].map((item) => (
                      <div
                        key={item.category}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium text-green-900">
                            {item.category}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.count} items
                          </p>
                        </div>
                        <div className="flex w-1/2 flex-col gap-1">
                          <Progress
                            value={item.percentage}
                            className="h-2 bg-green-100"
                            indicatorClassName="bg-green-600"
                          />
                          <p className="text-right text-xs text-gray-500">
                            {item.percentage}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Low Stock Alerts */}
          <Card className="border-green-200 bg-white shadow-sm lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-green-900">
                  Low Stock Alerts
                </CardTitle>
                <CardDescription>Items that need reordering</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-green-200 text-green-800 hover:bg-green-100 hover:text-green-900"
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Wireless Headphones",
                    sku: "EL-1234",
                    stock: 5,
                    threshold: 10,
                  },
                  {
                    name: "Office Chair",
                    sku: "FN-5678",
                    stock: 3,
                    threshold: 15,
                  },
                  {
                    name: "Smart Watch",
                    sku: "EL-9012",
                    stock: 2,
                    threshold: 8,
                  },
                  {
                    name: "Desk Lamp",
                    sku: "FN-3456",
                    stock: 4,
                    threshold: 12,
                  },
                  {
                    name: "Bluetooth Speaker",
                    sku: "EL-7890",
                    stock: 6,
                    threshold: 20,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-md border border-green-200 bg-green-50 p-3"
                  >
                    <div>
                      <p className="font-medium text-green-900">{item.name}</p>
                      <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-amber-600">
                        {item.stock} left
                      </p>
                      <p className="text-xs text-gray-500">
                        Threshold: {item.threshold}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders and Top Products */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Recent Orders */}
          <Card className="border-green-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-green-900">Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-green-200 text-green-800 hover:bg-green-100 hover:text-green-900"
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "ORD-7523",
                    customer: "John Smith",
                    date: "May 23, 2025",
                    status: "Shipped",
                    amount: "$245.99",
                  },
                  {
                    id: "ORD-7522",
                    customer: "Sarah Johnson",
                    date: "May 22, 2025",
                    status: "Processing",
                    amount: "$189.50",
                  },
                  {
                    id: "ORD-7521",
                    customer: "Michael Brown",
                    date: "May 22, 2025",
                    status: "Delivered",
                    amount: "$432.25",
                  },
                  {
                    id: "ORD-7520",
                    customer: "Emily Davis",
                    date: "May 21, 2025",
                    status: "Processing",
                    amount: "$76.99",
                  },
                  {
                    id: "ORD-7519",
                    customer: "Robert Wilson",
                    date: "May 21, 2025",
                    status: "Shipped",
                    amount: "$124.50",
                  },
                ].map((order, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-md border border-green-200 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {order.status === "Delivered" ? (
                          <Box />
                        ) : order.status === "Shipped" ? (
                          <Truck />
                        ) : (
                          <Clock />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-green-900">{order.id}</p>
                        <p className="text-xs text-gray-500">
                          {order.customer}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-900">
                        {order.amount}
                      </p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Selling Products */}
          <Card className="border-green-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-green-900">
                  Top Selling Products
                </CardTitle>
                <CardDescription>
                  Best performing items this month
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-green-200 text-green-800 hover:bg-green-100 hover:text-green-900"
              >
                View Report
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Wireless Earbuds Pro",
                    category: "Electronics",
                    sales: 245,
                    trend: "up",
                    percentage: 12,
                  },
                  {
                    name: "Ergonomic Office Chair",
                    category: "Furniture",
                    sales: 189,
                    trend: "up",
                    percentage: 8,
                  },
                  {
                    name: "Smart Watch Series 5",
                    category: "Electronics",
                    sales: 156,
                    trend: "down",
                    percentage: 3,
                  },
                  {
                    name: "Premium Coffee Maker",
                    category: "Kitchen",
                    sales: 132,
                    trend: "up",
                    percentage: 15,
                  },
                  {
                    name: "Bluetooth Speaker",
                    category: "Electronics",
                    sales: 98,
                    trend: "down",
                    percentage: 5,
                  },
                ].map((product, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-md border border-green-200 p-3"
                  >
                    <div>
                      <p className="font-medium text-green-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <p className="font-medium text-green-900">
                          {product.sales} units
                        </p>
                        {product.trend === "up" ? (
                          <ArrowUp className="h-3 w-3 text-green-600" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-red-600" />
                        )}
                      </div>
                      <p
                        className={`text-xs ${
                          product.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {product.trend === "up" ? "+" : "-"}
                        {product.percentage}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Supplier Status */}
        <Card className="border-green-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-green-900">Supplier Status</CardTitle>
              <CardDescription>
                Active suppliers and pending orders
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-green-200 text-green-800 hover:bg-green-100 hover:text-green-900"
            >
              Manage Suppliers
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-green-200 text-left">
                    <th className="pb-2 text-sm font-medium text-gray-500">
                      Supplier
                    </th>
                    <th className="pb-2 text-sm font-medium text-gray-500">
                      Contact
                    </th>
                    <th className="pb-2 text-sm font-medium text-gray-500">
                      Active Orders
                    </th>
                    <th className="pb-2 text-sm font-medium text-gray-500">
                      Last Delivery
                    </th>
                    <th className="pb-2 text-sm font-medium text-gray-500">
                      Status
                    </th>
                    <th className="pb-2 text-sm font-medium text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "TechSupply Inc.",
                      contact: "contact@techsupply.com",
                      orders: 3,
                      lastDelivery: "May 18, 2025",
                      status: "Active",
                    },
                    {
                      name: "Furniture Wholesale",
                      contact: "orders@furnwholesale.com",
                      orders: 1,
                      lastDelivery: "May 15, 2025",
                      status: "Active",
                    },
                    {
                      name: "ElectroGoods Ltd.",
                      contact: "supply@electrogoods.com",
                      orders: 0,
                      lastDelivery: "May 10, 2025",
                      status: "Inactive",
                    },
                    {
                      name: "Kitchen Essentials",
                      contact: "orders@kitcheness.com",
                      orders: 2,
                      lastDelivery: "May 20, 2025",
                      status: "Active",
                    },
                  ].map((supplier, i) => (
                    <tr key={i} className="border-b border-green-100">
                      <td className="py-3 text-sm font-medium text-green-900">
                        {supplier.name}
                      </td>
                      <td className="py-3 text-sm text-gray-500">
                        {supplier.contact}
                      </td>
                      <td className="py-3 text-sm text-gray-500">
                        {supplier.orders}
                      </td>
                      <td className="py-3 text-sm text-gray-500">
                        {supplier.lastDelivery}
                      </td>
                      <td className="py-3 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            supplier.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {supplier.status}
                        </span>
                      </td>
                      <td className="py-3 text-sm">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-green-700 hover:bg-green-100 hover:text-green-900"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
