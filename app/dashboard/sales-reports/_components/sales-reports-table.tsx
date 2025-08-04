import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

const salesData = [
  {
    id: 1,
    productName: "Organic Bananas",
    category: "Fresh Produce",
    unitsSold: 1250,
    revenue: 6237.5,
    profit: 2487.5,
    profitMargin: 39.9,
    trend: "up",
    trendValue: 15.2,
  },
  {
    id: 2,
    productName: "Whole Milk",
    category: "Dairy & Eggs",
    unitsSold: 980,
    revenue: 3420.2,
    profit: 1368.08,
    profitMargin: 40.0,
    trend: "up",
    trendValue: 8.5,
  },
  {
    id: 3,
    productName: "Red Apples",
    category: "Fresh Produce",
    unitsSold: 850,
    revenue: 2966.5,
    profit: 1186.6,
    profitMargin: 40.0,
    trend: "down",
    trendValue: -3.2,
  },
  {
    id: 4,
    productName: "Cheddar Cheese",
    category: "Dairy & Eggs",
    unitsSold: 720,
    revenue: 4312.8,
    profit: 1725.12,
    profitMargin: 40.0,
    trend: "up",
    trendValue: 12.8,
  },
  {
    id: 5,
    productName: "Chicken Breast",
    category: "Meat & Seafood",
    unitsSold: 650,
    revenue: 8443.5,
    profit: 3377.4,
    profitMargin: 40.0,
    trend: "up",
    trendValue: 22.1,
  },
  {
    id: 6,
    productName: "Orange Juice",
    category: "Beverages",
    unitsSold: 580,
    revenue: 2604.2,
    profit: 1041.68,
    profitMargin: 40.0,
    trend: "down",
    trendValue: -5.7,
  },
];

export function SalesReportsTable() {
  return (
    <Card className="border-green-200">
      <CardHeader>
        <CardTitle className="text-green-800">
          Detailed Sales Analysis
        </CardTitle>
        <p className="text-sm text-green-600">
          Product-wise sales performance and profitability
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-green-200">
                <th className="text-left py-3 px-4 font-medium text-green-800">
                  Product
                </th>
                <th className="text-left py-3 px-4 font-medium text-green-800">
                  Category
                </th>
                <th className="text-right py-3 px-4 font-medium text-green-800">
                  Units Sold
                </th>
                <th className="text-right py-3 px-4 font-medium text-green-800">
                  Revenue
                </th>
                <th className="text-right py-3 px-4 font-medium text-green-800">
                  Profit
                </th>
                <th className="text-right py-3 px-4 font-medium text-green-800">
                  Margin
                </th>
                <th className="text-right py-3 px-4 font-medium text-green-800">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-green-100 hover:bg-green-50"
                >
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">
                      {item.productName}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant="outline"
                      className="border-green-200 text-green-700"
                    >
                      {item.category}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right font-medium">
                    {item.unitsSold.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-medium">
                    ${item.revenue.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-green-600">
                    ${item.profit.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {item.profitMargin.toFixed(1)}%
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {item.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          item.trend === "up"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {item.trend === "up" ? "+" : ""}
                        {item.trendValue}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
