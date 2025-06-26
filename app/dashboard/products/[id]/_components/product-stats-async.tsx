import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, DollarSign, TrendingUp, Clock } from "lucide-react";
import { IProduct } from "@/models/product";

interface ProductStatsAsyncProps {
  product: IProduct;
}

export async function ProductStatsAsync({ product }: ProductStatsAsyncProps) {
  if (!product) return null;

  const totalValue = product.sellingPrice * product.currentStock;
  const profitPerUnit = product.sellingPrice - product.costPrice;
  const totalProfit = profitPerUnit * product.currentStock;
  const daysInStock = Math.floor(Math.random() * 30) + 1;

  const stats = [
    {
      title: "Current Stock",
      value: `${product.currentStock} units`,
      icon: Package,
      color: "bg-green-50 border-green-200 text-green-700",
      valueColor: "text-green-900",
    },
    {
      title: "Total Value",
      value: `$${totalValue.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-blue-50 border-blue-200 text-blue-700",
      valueColor: "text-blue-900",
    },
    {
      title: "Potential Profit",
      value: `$${totalProfit.toFixed(2)}`,
      icon: TrendingUp,
      color: "bg-purple-50 border-purple-200 text-purple-700",
      valueColor: "text-purple-900",
    },
    {
      title: "Days in Stock",
      value: `${daysInStock} days`,
      icon: Clock,
      color: "bg-orange-50 border-orange-200 text-orange-700",
      valueColor: "text-orange-900",
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
            <div className={`text-lg sm:text-xl font-bold ${stat.valueColor}`}>
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
