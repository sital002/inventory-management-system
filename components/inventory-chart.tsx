"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Electronics",
    inStock: 120,
    lowStock: 15,
    outOfStock: 5,
  },
  {
    name: "Furniture",
    inStock: 80,
    lowStock: 10,
    outOfStock: 2,
  },
  {
    name: "Office",
    inStock: 150,
    lowStock: 8,
    outOfStock: 0,
  },
  {
    name: "Kitchen",
    inStock: 70,
    lowStock: 12,
    outOfStock: 3,
  },
  {
    name: "Accessories",
    inStock: 90,
    lowStock: 20,
    outOfStock: 8,
  },
];

export function InventoryChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="inStock"
          name="In Stock"
          fill="#22c55e"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="lowStock"
          name="Low Stock"
          fill="#eab308"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="outOfStock"
          name="Out of Stock"
          fill="#ef4444"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
