"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";

interface SalesReportsChartsProps {
  dateRange: string;
  category: string;
  reportType: string;
}

const salesByCategoryData = [
  { name: "Fresh Produce", value: 35420, percentage: 28.2, color: "#16a34a" },
  { name: "Dairy & Eggs", value: 28750, percentage: 22.9, color: "#22c55e" },
  { name: "Meat & Seafood", value: 24340, percentage: 19.4, color: "#4ade80" },
  { name: "Beverages", value: 18200, percentage: 14.5, color: "#86efac" },
  { name: "Bakery", value: 12250, percentage: 9.8, color: "#bbf7d0" },
  { name: "Others", value: 6790, percentage: 5.4, color: "#dcfce7" },
];

const revenueTrendsData = [
  { date: "Jan 1", revenue: 4200, orders: 45 },
  { date: "Jan 2", revenue: 3800, orders: 42 },
  { date: "Jan 3", revenue: 5100, orders: 58 },
  { date: "Jan 4", revenue: 4600, orders: 51 },
  { date: "Jan 5", revenue: 5800, orders: 65 },
  { date: "Jan 6", revenue: 6200, orders: 72 },
  { date: "Jan 7", revenue: 5400, orders: 61 },
  { date: "Jan 8", revenue: 4900, orders: 55 },
  { date: "Jan 9", revenue: 6800, orders: 78 },
  { date: "Jan 10", revenue: 7200, orders: 82 },
  { date: "Jan 11", revenue: 6500, orders: 74 },
  { date: "Jan 12", revenue: 5900, orders: 67 },
  { date: "Jan 13", revenue: 7800, orders: 89 },
  { date: "Jan 14", revenue: 8200, orders: 95 },
];

const topProductsData = [
  { name: "Organic Bananas", sales: 1250, revenue: 6237.5, profit: 2487.5 },
  { name: "Whole Milk", sales: 980, revenue: 3420.2, profit: 1368.08 },
  { name: "Red Apples", sales: 850, revenue: 2966.5, profit: 1186.6 },
  { name: "Cheddar Cheese", sales: 720, revenue: 4312.8, profit: 1725.12 },
  { name: "Chicken Breast", sales: 650, revenue: 8443.5, profit: 3377.4 },
  { name: "Orange Juice", sales: 580, revenue: 2604.2, profit: 1041.68 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-green-200 rounded-lg shadow-lg">
        <p className="text-green-800 font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-green-600">
            {entry.name}:{" "}
            {entry.name === "Revenue"
              ? `$${entry.value.toLocaleString()}`
              : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-green-200 rounded-lg shadow-lg">
        <p className="text-green-800 font-medium">{data.name}</p>
        <p className="text-green-600">
          Revenue: ${data.value.toLocaleString()}
        </p>
        <p className="text-green-600">Percentage: {data.percentage}%</p>
      </div>
    );
  }
  return null;
};

export function SalesReportsCharts({
  dateRange,
  category,
  reportType,
}: SalesReportsChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Sales by Category</CardTitle>
          <p className="text-sm text-green-600">
            Revenue distribution across product categories
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesByCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {salesByCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value, entry: any) => (
                    <span className="text-green-700 text-sm">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Revenue Trends</CardTitle>
          <p className="text-sm text-green-600">
            Daily revenue and order trends
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dcfce7" />
                <XAxis dataKey="date" stroke="#16a34a" fontSize={12} />
                <YAxis stroke="#16a34a" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={{ fill: "#16a34a", strokeWidth: 2, r: 4 }}
                  name="Revenue ($)"
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ fill: "#22c55e", strokeWidth: 2, r: 3 }}
                  name="Orders"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Products - Bar Chart */}
      <Card className="border-green-200 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-green-800">
            Top Performing Products
          </CardTitle>
          <p className="text-sm text-green-600">
            Best-selling products by revenue and profit
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topProductsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#dcfce7" />
                <XAxis
                  dataKey="name"
                  stroke="#16a34a"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#16a34a" fontSize={12} />
                <Tooltip
                  formatter={(value: any, name: string) => [
                    name === "sales" ? value : `$${value.toLocaleString()}`,
                    name === "sales"
                      ? "Units Sold"
                      : name === "revenue"
                      ? "Revenue"
                      : "Profit",
                  ]}
                  labelStyle={{ color: "#16a34a" }}
                />
                <Legend />
                <Bar
                  dataKey="revenue"
                  fill="#16a34a"
                  name="Revenue ($)"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="profit"
                  fill="#22c55e"
                  name="Profit ($)"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Sales Performance Summary */}
      <Card className="border-green-200 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-green-800">
            Sales Performance Summary
          </CardTitle>
          <p className="text-sm text-green-600">
            Key performance indicators and metrics
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-800">28.2%</div>
              <div className="text-sm text-green-600">Top Category Share</div>
              <div className="text-xs text-green-500">Fresh Produce</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-800">$8.2K</div>
              <div className="text-sm text-green-600">Peak Daily Revenue</div>
              <div className="text-xs text-green-500">Jan 14</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-800">1,250</div>
              <div className="text-sm text-green-600">Top Product Sales</div>
              <div className="text-xs text-green-500">Organic Bananas</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-800">39.9%</div>
              <div className="text-sm text-green-600">
                Average Profit Margin
              </div>
              <div className="text-xs text-green-500">Across all products</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
