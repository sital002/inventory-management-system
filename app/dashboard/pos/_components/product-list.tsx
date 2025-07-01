"use client";

import { Plus, Package, Leaf, Snowflake } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductResponse } from "../page";
import { ICategory } from "@/models/category";

interface ProductListProps {
  products: ProductResponse[];
  onAddToCart: (product: ProductResponse, quantity: number) => void;
  categories: ICategory[];
}

export function ProductList({
  products,
  onAddToCart,
  categories,
}: ProductListProps) {
  const getStockStatus = (product: ProductResponse) => {
    if (product.currentStock === 0)
      return { status: "Out of Stock", color: "bg-red-100 text-red-800" };
    if (product.currentStock <= product.lowStockThreshold)
      return { status: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    return { status: "In Stock", color: "bg-green-100 text-green-800" };
  };

  if (products.length === 0) {
    return (
      <Card className="bg-white border-green-200">
        <CardContent className="py-12 text-center">
          <Package className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-green-900 mb-2">
            No Products Found
          </h3>
          <p className="text-green-600">
            Try adjusting your search criteria or category filter.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border-green-200">
      <CardHeader>
        <CardTitle className="text-green-900">
          Available Products ({products.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {products.map((product) => {
            const stockStatus = getStockStatus(product);
            const finalPrice = product.discountPrice || product.sellingPrice;
            const hasDiscount =
              product.discountPrice && product.discountPrice > 0;

            return (
              <div
                key={product._id.toString()}
                className="flex items-center justify-between p-4 border border-green-100 rounded-lg hover:bg-green-50/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-green-900">
                        {product.name}
                      </h4>
                      <p className="text-sm text-green-600">
                        {product.brand && `${product.brand} • `}
                        SKU: {product.sku} • {product.category.name}
                      </p>
                    </div>
                    <Badge className={stockStatus.color}>
                      {stockStatus.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    {product.isOrganic && (
                      <Badge
                        variant="outline"
                        className="text-green-700 border-green-300"
                      >
                        <Leaf className="h-3 w-3 mr-1" />
                        Organic
                      </Badge>
                    )}
                    {product.requiresRefrigeration && (
                      <Badge
                        variant="outline"
                        className="text-blue-700 border-blue-300"
                      >
                        <Snowflake className="h-3 w-3 mr-1" />
                        Refrigerated
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-green-900">
                        ${finalPrice.toFixed(2)} / {product.unit}
                      </span>
                      {hasDiscount && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.sellingPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-green-600">
                      Stock: {product.currentStock} {product.unit}
                    </span>
                  </div>
                </div>

                <div className="ml-4">
                  <Button
                    onClick={() => onAddToCart(product, 1)}
                    disabled={product.currentStock === 0}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
