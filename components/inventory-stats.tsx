import { ArrowDown, ArrowUp, DollarSign, Package, ShoppingCart } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function InventoryStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-green-200">
        <CardHeader className="bg-green-50 border-b border-green-100 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Total Items</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">1,284</div>
            <div className="p-2 bg-green-100 rounded-full">
              <Package className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs">
            <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
            <span className="text-green-600 font-medium">12%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200">
        <CardHeader className="bg-green-50 border-b border-green-100 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Low Stock Items</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">23</div>
            <div className="p-2 bg-amber-100 rounded-full">
              <Package className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs">
            <ArrowUp className="h-3 w-3 text-amber-600 mr-1" />
            <span className="text-amber-600 font-medium">5%</span>
            <span className="text-gray-500 ml-1">from last week</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200">
        <CardHeader className="bg-green-50 border-b border-green-100 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Inventory Value</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">$284,587</div>
            <div className="p-2 bg-green-100 rounded-full">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs">
            <ArrowDown className="h-3 w-3 text-red-600 mr-1" />
            <span className="text-red-600 font-medium">3%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200">
        <CardHeader className="bg-green-50 border-b border-green-100 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Pending Orders</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">42</div>
            <div className="p-2 bg-green-100 rounded-full">
              <ShoppingCart className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs">
            <ArrowDown className="h-3 w-3 text-green-600 mr-1" />
            <span className="text-green-600 font-medium">8%</span>
            <span className="text-gray-500 ml-1">from yesterday</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
