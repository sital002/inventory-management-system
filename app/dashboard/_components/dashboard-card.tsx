import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, AlertTriangle, TrendingUp, DollarSign } from "lucide-react";
import { inventoryItems } from "@/lib/data";

export async function DashboardStats() {
  // Simulate data fetching delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const totalItems = inventoryItems.length;
  const lowStockItems = inventoryItems.filter(
    (item) => item.stock <= item.lowStockThreshold && item.stock > 0
  ).length;
  const outOfStockItems = inventoryItems.filter(
    (item) => item.stock === 0
  ).length;
  const totalValue = inventoryItems.reduce(
    (sum, item) => sum + item.price * item.stock,
    0
  );

  const stats = [
    {
      title: "Total Items",
      value: totalItems.toString(),
      icon: Package,
      color: "bg-green-50 border-green-200 text-green-700",
      valueColor: "text-green-900",
    },
    {
      title: "Low Stock Alerts",
      value: lowStockItems.toString(),
      icon: AlertTriangle,
      color: "bg-yellow-50 border-yellow-200 text-yellow-700",
      valueColor: "text-yellow-900",
    },
    {
      title: "Out of Stock",
      value: outOfStockItems.toString(),
      icon: TrendingUp,
      color: "bg-red-50 border-red-200 text-red-700",
      valueColor: "text-red-900",
    },
    {
      title: "Total Value",
      value: `$${totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-blue-50 border-blue-200 text-blue-700",
      valueColor: "text-blue-900",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className={stat.color}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-xl sm:text-2xl font-bold ${stat.valueColor}`}>
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
