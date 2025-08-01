"use client";

import { useState } from "react";
import {
  Search,
  TrendingUp,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { targetProduct } from "@/actions/product";

// Updated ProductData
interface ProductData {
  name: string;
  avgDailySales: number;
  unitsNeededToday: number;
  revenue: number;
  estimatedRevenue?: number;
}

export default function InventoryTargetCalculator() {
  const [targetPrice, setTargetPrice] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [productData, setProductData] = useState<ProductData[]>([]);
  const itemsPerPage = 8;
  const [sortBy, setSortBy] = useState<"unitsNeeded" | "revenue" | "name">(
    "unitsNeeded"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const calculateProducts = async () => {
    if (!targetPrice || isNaN(Number(targetPrice))) return;

    const result = (await targetProduct(Number(targetPrice))) as ProductData[];
    console.log("result>>", result);

    // ✅ FIX: Use provided revenue, not avgDailySales * unitsNeededToday
    const productsWithRevenue = result.map((product) => ({
      ...product,
      estimatedRevenue: product.revenue, // Direct from backend
    }));

    setProductData(productsWithRevenue);
    setShowResults(true);
    setCurrentPage(1);
  };

  const handleSort = (column: "unitsNeeded" | "revenue" | "name") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const filteredResults = productData
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (product.avgDailySales > 0 || product.unitsNeededToday > 0)
    )
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "unitsNeeded":
          comparison = a.unitsNeededToday - b.unitsNeededToday;
          break;
        case "revenue":
          comparison = (a.estimatedRevenue || 0) - (b.estimatedRevenue || 0);
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
      }
      return sortOrder === "desc" ? -comparison : comparison;
    });

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredResults.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const activeProducts = productData.filter(
    (product) => product.avgDailySales > 0 || product.unitsNeededToday > 0
  );
  const totalUnitsNeeded = activeProducts.reduce(
    (sum, product) => sum + product.unitsNeededToday,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="w-10 h-10 text-emerald-600 mr-4" />
              Target Revenue Calculator
            </h1>
            <p className="text-gray-600 mt-2">
              Product sales data with daily averages and units needed
            </p>
          </div>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-emerald-700">
              Product Sales Data
            </CardTitle>
            <CardDescription>
              View product data with average daily sales and units needed today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex-1 max-w-md">
                <Input
                  type="number"
                  placeholder="Enter target revenue ($)"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  className="text-lg"
                />
              </div>
              <Button
                onClick={calculateProducts}
                disabled={!targetPrice || isNaN(Number(targetPrice))}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Show Products
              </Button>
              {showResults && (
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <Badge
                    variant="outline"
                    className="bg-emerald-50 text-emerald-700 border-emerald-200"
                  >
                    Total Products: {productData.length}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    Active Products: {activeProducts.length}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    Total Units: {totalUnitsNeeded}
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {showResults && (
          <Card>
            <CardHeader>
              <CardTitle className="text-emerald-700">
                Product Sales Data
              </CardTitle>
              <CardDescription>
                Showing {filteredResults.length} products with sales data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">S.N</th>
                      <th
                        onClick={() => handleSort("name")}
                        className="cursor-pointer"
                      >
                        Product Name
                      </th>
                      <th className="text-center">Avg Daily Sales</th>
                      <th
                        onClick={() => handleSort("unitsNeeded")}
                        className="text-center cursor-pointer"
                      >
                        Units Needed
                      </th>
                      <th
                        onClick={() => handleSort("revenue")}
                        className="text-center cursor-pointer"
                      >
                        Est. Revenue ($)
                      </th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProducts.map((product, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">{startIndex + index + 1}</td>
                        <td className="py-4 px-4">{product.name}</td>
                        <td className="py-4 px-4 text-center">
                          {product.avgDailySales}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {product.unitsNeededToday}
                        </td>
                        <td className="py-4 px-4 text-center">
                          $
                          {(product.estimatedRevenue || 0).toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <Badge className="bg-emerald-100 text-emerald-800">
                            ✓ Active
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <strong>Total Est. Revenue:</strong> $
                {activeProducts
                  .reduce(
                    (sum, product) => sum + (product.estimatedRevenue || 0),
                    0
                  )
                  .toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
