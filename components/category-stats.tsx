import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { inventoryStats } from "@/lib/data"

export function CategoryStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-green-50 border-green-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Total Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">{inventoryStats.totalCategories}</div>
        </CardContent>
      </Card>
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-700">Total Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">{inventoryStats.totalItems.toLocaleString()}</div>
        </CardContent>
      </Card>
      <Card className="bg-red-50 border-red-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-red-700">Low Stock Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-900">{inventoryStats.lowStockItems}</div>
        </CardContent>
      </Card>
      <Card className="bg-green-50 border-green-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Total Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">${inventoryStats.totalValue.toLocaleString()}</div>
        </CardContent>
      </Card>
    </div>
  )
}
