import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { customerOrderStats } from "@/lib/data"

export function CustomerOrderStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
      <Card className="bg-green-50 border-green-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Total Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">{customerOrderStats.totalOrders}</div>
        </CardContent>
      </Card>
      <Card className="bg-green-50 border-green-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">{customerOrderStats.completed}</div>
        </CardContent>
      </Card>
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-700">Preparing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">{customerOrderStats.preparing}</div>
        </CardContent>
      </Card>
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-yellow-700">Ready</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-900">{customerOrderStats.ready}</div>
        </CardContent>
      </Card>
      <Card className="bg-red-50 border-red-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-red-700">Cancelled</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-900">{customerOrderStats.cancelled}</div>
        </CardContent>
      </Card>
      <Card className="bg-green-50 border-green-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">${customerOrderStats.totalRevenue.toFixed(2)}</div>
        </CardContent>
      </Card>
    </div>
  )
}
