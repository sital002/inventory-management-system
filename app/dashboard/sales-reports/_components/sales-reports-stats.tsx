import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";

interface SalesReportsStatsProps {
  dateRange: string;
  category: string;
}

export function SalesReportsStats({
  dateRange,
  category,
}: SalesReportsStatsProps) {
  const stats = {
    totalRevenue: 125750.5,
    totalOrders: 1847,
    averageOrderValue: 68.12,
    totalCustomers: 456,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">
            Total Revenue
          </CardTitle>
          <DollarSign className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">
            ${stats.totalRevenue.toLocaleString()}
          </div>
          <p className="text-xs text-green-600 mt-1">+15% from last period</p>
        </CardContent>
      </Card>

      <Card className="border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">
            Total Orders
          </CardTitle>
          <ShoppingCart className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">
            {stats.totalOrders.toLocaleString()}
          </div>
          <p className="text-xs text-green-600 mt-1">+8% from last period</p>
        </CardContent>
      </Card>

      <Card className="border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">
            Average Order Value
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">
            ${stats.averageOrderValue.toFixed(2)}
          </div>
          <p className="text-xs text-green-600 mt-1">+5% from last period</p>
        </CardContent>
      </Card>

      <Card className="border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">
            Total Customers
          </CardTitle>
          <Users className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">
            {stats.totalCustomers}
          </div>
          <p className="text-xs text-green-600 mt-1">+12% from last period</p>
        </CardContent>
      </Card>
    </div>
  );
}
