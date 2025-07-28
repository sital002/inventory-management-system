"use client";

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
import { TrendingUp, Package } from "lucide-react";

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
  console.log(productSellingUnit);
  const totalPrediction = productSellingUnit.reduce(
    (sum, product) => sum + product.predicted,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
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

        {/* Total Summary */}
        <div className="mb-6 flex justify-center">
          <Badge className="bg-green-100 text-green-800 border-green-300 text-lg px-4 py-2">
            Total Tomorrow: {totalPrediction} units
          </Badge>
        </div>

        {/* Products Table */}
        <Card className="border-green-200 shadow-lg">
          <CardHeader className="bg-green-50 border-b border-green-100">
            <CardTitle className="text-green-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Product Demand Predictions
            </CardTitle>
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
                  {productSellingUnit.map((product, idx) => (
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
