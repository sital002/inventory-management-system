"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Package, ChevronLeft, ChevronRight } from "lucide-react";

export interface Product {
  productName: string;
  last5Days: number[];
  predicted: number;
  sellUnit?: number[];
}

type SellingUnit = {
  productSellingUnit: Product[];
};

export default function ProductDemandTable({
  productSellingUnit,
}: SellingUnit) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  console.log(productSellingUnit);

  const sortedProducts = [...productSellingUnit].sort(
    (a, b) => b.predicted - a.predicted
  );

  const totalPrediction = sortedProducts.reduce(
    (sum, product) => sum + product.predicted,
    0
  );

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Package className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Product Demand Forecast
            </h1>
          </div>
          <p className="text-gray-600">
            Tomorrow's demand prediction for all products
          </p>
        </div>

        <div className="mb-6 flex justify-center">
          <Badge className="bg-green-100 text-green-800 border-green-300 text-lg px-4 py-2">
            Total Tomorrow: {totalPrediction} units
          </Badge>
        </div>

        <Card className="border-green-200 shadow-lg">
          <CardHeader className="bg-green-50 border-b border-green-100">
            <CardTitle className="text-green-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Product Demand Predictions
            </CardTitle>
            <div className="text-sm text-green-600">
              Showing {startIndex + 1}-
              {Math.min(endIndex, sortedProducts.length)} of{" "}
              {sortedProducts.length} products
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-25">
                    <TableHead className="font-semibold text-green-800">
                      Product Name
                    </TableHead>
                    <TableHead className="font-semibold text-green-800 text-center">
                      4 Days Ago
                    </TableHead>
                    <TableHead className="font-semibold text-green-800 text-center">
                      3 Days Ago
                    </TableHead>
                    <TableHead className="font-semibold text-green-800 text-center">
                      2 Days Ago
                    </TableHead>
                    <TableHead className="font-semibold text-green-800 text-center">
                      Yesterday
                    </TableHead>
                    <TableHead className="font-semibold text-green-800 text-center">
                      Today
                    </TableHead>
                    <TableHead className="font-semibold text-green-800 text-center bg-green-100">
                      Tomorrow's Demand
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentProducts.map((product, idx) => (
                    <TableRow
                      key={product.productName + idx}
                      className="hover:bg-green-25"
                    >
                      <TableCell className="font-medium text-gray-900">
                        {product.productName}
                      </TableCell>
                      {product.last5Days.map((val, i) => (
                        <TableCell key={i} className="text-center">
                          <div className="text-lg font-medium text-gray-700">
                            {val}
                          </div>
                        </TableCell>
                      ))}
                      <TableCell className="text-center bg-green-50">
                        <div className="text-2xl font-bold text-green-600">
                          {product.predicted}
                        </div>
                        <div className="text-xs text-gray-500">units</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-t border-green-100 bg-green-25">
              <div className="text-sm text-green-600">
                Page {currentPage} of {totalPages}{" "}
                {sortedProducts.length < itemsPerPage &&
                  "(Pagination disabled - less than 10 products)"}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPrevious}
                  disabled={
                    currentPage === 1 || sortedProducts.length < itemsPerPage
                  }
                  className="border-green-300 text-green-700 hover:bg-green-100 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                {/* Page Numbers */}
                <div className="flex gap-1">
                  {Array.from(
                    { length: Math.min(5, Math.max(1, totalPages)) },
                    (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => goToPage(pageNum)}
                          disabled={sortedProducts.length < itemsPerPage}
                          className={
                            currentPage === pageNum
                              ? "bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                              : "border-green-300 text-green-700 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  onClick={goToNext}
                  disabled={
                    currentPage === totalPages ||
                    sortedProducts.length < itemsPerPage
                  }
                  className="border-green-300 text-green-700 hover:bg-green-100 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
