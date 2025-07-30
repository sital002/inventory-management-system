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

// Type definition for product data
interface ProductData {
  name: string;
  avgDailySales: number;
  unitsNeededToday: number;
  estimatedRevenue?: number;
}

interface InventoryCalculatorProps {
  productData?: ProductData[];
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
    if (!targetPrice || isNaN(Number(targetPrice))) {
      return;
    }
    const result = (await targetProduct(Number(targetPrice))) as ProductData[];
    console.log(">>.", result);

    // Calculate estimated revenue for each product
    const productsWithRevenue = result.map((product) => ({
      ...product,
      estimatedRevenue: product.avgDailySales * product.unitsNeededToday,
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
        (product.avgDailySales > 0 || product.unitsNeededToday > 0) // Filter out products with 0 values
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
        default:
          comparison = a.unitsNeededToday - b.unitsNeededToday;
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
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <TrendingUp className="w-10 h-10 text-emerald-600 mr-4" />
                Target Revenue Calculator
              </h1>
              <p className="text-gray-600 mt-2">
                Product sales data with daily averages and units needed
              </p>
            </div>
            <div className="flex items-center space-x-4">
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Target Input Section */}
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
                <div className="flex items-center justify-between">
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
                  <div className="text-sm text-gray-500">
                    Sorted by:{" "}
                    {sortBy === "unitsNeeded"
                      ? "Units Needed"
                      : sortBy === "revenue"
                      ? "Revenue"
                      : "Name"}
                    ({sortOrder === "desc" ? "High to Low" : "Low to High"})
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Table - Only show when button is clicked */}
        {showResults && (
          <Card>
            <CardHeader>
              <CardTitle className="text-emerald-700">
                Product Sales Data
              </CardTitle>
              <CardDescription>
                Showing {filteredResults.length} products with sales data
                (filtered active products)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        S.N
                      </th>
                      <th
                        className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleSort("name")}
                      >
                        Product Name{" "}
                        {sortBy === "name" &&
                          (sortOrder === "desc" ? "↓" : "↑")}
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">
                        Avg Daily Sales
                      </th>
                      <th
                        className="text-center py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleSort("unitsNeeded")}
                      >
                        Units Needed to Sell Today{" "}
                        {sortBy === "unitsNeeded" &&
                          (sortOrder === "desc" ? "↓" : "↑")}
                      </th>
                      <th
                        className="text-center py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleSort("revenue")}
                      >
                        Est. Revenue ($){" "}
                        {sortBy === "revenue" &&
                          (sortOrder === "desc" ? "↓" : "↑")}
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProducts.map((product, index) => (
                      <tr
                        key={`${product.name}-${index}`}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm">
                            {startIndex + index + 1}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">
                            {product.name}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-blue-600 text-lg">
                          {product.avgDailySales}
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-emerald-700 text-lg">
                          {product.unitsNeededToday}
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-green-600 text-lg">
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
                          {product.avgDailySales > 0 &&
                          product.unitsNeededToday > 0 ? (
                            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                              ✓ Active
                            </Badge>
                          ) : product.avgDailySales > 0 ? (
                            <Badge
                              variant="outline"
                              className="bg-yellow-50 text-yellow-700 border-yellow-200"
                            >
                              Sales Only
                            </Badge>
                          ) : product.unitsNeededToday > 0 ? (
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 border-blue-200"
                            >
                              Units Only
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Inactive</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {activeProducts.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    📈 Summary
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-blue-700">
                        Total Products:
                      </span>
                      <span className="ml-2 text-blue-600">
                        {productData.length}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-700">
                        Active Products:
                      </span>
                      <span className="ml-2 text-blue-600">
                        {activeProducts.length}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-700">
                        Total Units Needed:
                      </span>
                      <span className="ml-2 text-blue-600">
                        {totalUnitsNeeded}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-700">
                        Total Est. Revenue:
                      </span>
                      <span className="ml-2 text-blue-600">
                        $
                        {activeProducts
                          .reduce(
                            (sum, product) =>
                              sum + (product.estimatedRevenue || 0),
                            0
                          )
                          .toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    <div className="flex items-center space-x-1">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          const pageNum =
                            Math.max(
                              1,
                              Math.min(totalPages - 4, currentPage - 2)
                            ) + i;
                          return (
                            <Button
                              key={pageNum}
                              variant={
                                currentPage === pageNum ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => setCurrentPage(pageNum)}
                              className={
                                currentPage === pageNum
                                  ? "bg-emerald-600 hover:bg-emerald-700"
                                  : ""
                              }
                            >
                              {pageNum}
                            </Button>
                          );
                        }
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {!showResults && (
          <Card>
            <CardContent className="text-center py-12">
              <DollarSign className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Product Data Ready
              </h3>
              <p className="text-gray-600">
                {productData.length} products loaded. Click "Show Products" to
                display the data.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Data includes: name, avgDailySales, and unitsNeededToday for
                each product.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
