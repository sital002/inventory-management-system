import { ICategory } from "@/models/category";
import { IProduct } from "@/models/product";
import { ISupplier } from "@/models/supplier";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatusColor, getStockStatus } from "@/utils/product";
import { Edit, Eye, Package } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  product: IProduct & { supplier: ISupplier } & { category: ICategory };
}

export function ProductCard({ product }: ProductCardProps) {
  const stockStatus = getStockStatus(
    product.currentStock,
    product.lowStockThreshold
  );
  return (
    <Card className="border-green-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 ">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm font-medium text-green-900 truncate">
                {product.name}
              </CardTitle>
              <p className="text-xs text-gray-500">SKU: {product.sku}</p>
            </div>
          </div>
          <Badge className={getStatusColor(stockStatus)}>{stockStatus}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Category:</span>
            <span className="font-medium text-green-900">
              {product.category?.name || "Uncategorized"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Price:</span>
            <span className="font-medium text-green-900">
              ${product.sellingPrice}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Stock:</span>
            <span className={`font-medium ${getStatusColor(stockStatus)}`}>
              {product.currentStock} units
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Supplier:</span>
            <span className="font-medium text-green-900 truncate">
              {product.supplier?.name}
            </span>
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1 border-green-200 text-green-800 hover:bg-green-100 hover:text-green-900"
            >
              <Link
                href={`/dashboard/products/${product._id.toString()}`}
                className="no-underline"
              >
                <Eye className="mr-1 h-3 w-3" />
                View
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-green-200 text-green-800 hover:bg-green-100 hover:text-green-900"
            >
              <Edit className="mr-1 h-3 w-3" />
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
