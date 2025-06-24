import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
} from "lucide-react";
import { ProductActions } from "./product-actions";
import { colorOptions } from "@/utils/color-options";
import { IProduct } from "@/app/models/product";
import { ISupplier } from "@/app/models/supplier";
import { ICategory } from "@/app/models/category";

interface ProductDetailsAsyncProps {
  product: IProduct & { supplier: ISupplier } & { categories: ICategory };
}

export async function ProductDetailsAsync({
  product,
}: ProductDetailsAsyncProps) {
  const getStockStatus = () => {
    if (product.stockLevel === 0) {
      return {
        label: "Out of Stock",
        color: "bg-red-100 text-red-800 border-red-200",
        icon: AlertTriangle,
      };
    } else if (product.stockLevel <= product.minStockLevel) {
      return {
        label: "Low Stock",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Clock,
      };
    } else {
      return {
        label: "In Stock",
        color: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle,
      };
    }
  };

  console.log(product);
  const status = getStockStatus();
  const StatusIcon = status.icon;

  const salesData = {
    totalSold: Math.floor(Math.random() * 100) + 50,
    revenue: (Math.floor(Math.random() * 1000) + 500).toFixed(2),
    avgDailySales: (Math.random() * 10 + 2).toFixed(1),
    lastSale: "2 hours ago",
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border-green-200">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-green-900 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Product Information
              </CardTitle>
              <CardDescription className="text-green-700">
                Detailed product specifications and status
              </CardDescription>
            </div>
            <ProductActions product={product} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-green-900 mb-3">
                  Basic Details
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Product Name:</span>
                    <span className="font-medium text-green-900">
                      {product.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">SKU:</span>
                    <span className="font-mono text-green-900">
                      {product.sku}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Category:</span>
                    <Badge
                      className={`${
                        colorOptions.find(
                          (option) => option.label === product.categories?.name
                        )?.value
                      } border`}
                    >
                      {product.categories?.name}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Status:</span>
                    <Badge className={`${status.color} border`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Supplier:</span>
                    <span className="font-medium text-green-900">
                      {product.supplier.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Last Restocked:</span>
                    <span className="text-green-900">
                      {product?.lastRestocked}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-green-900 mb-3">
                  Inventory & Pricing
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Current Stock:</span>
                    <span className="font-medium text-green-900">
                      {product.stockLevel} units
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Low Stock Alert:</span>
                    <span className="text-green-900">
                      {product.minStockLevel} units
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Unit Price:</span>
                    <span className="font-medium text-green-900">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Total Value:</span>
                    <span className="font-medium text-green-900">
                      ${(product.price * product.stockLevel).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Stock Level:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            product.stockLevel <= product.minStockLevel
                              ? "bg-red-500"
                              : "bg-green-500"
                          }`}
                          style={{
                            width: `${Math.min(
                              (product.stockLevel /
                                (product.minStockLevel * 2)) *
                                100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-green-600">
                        {Math.round(
                          (product.stockLevel / (product.minStockLevel * 2)) *
                            100
                        )}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="mt-6 pt-6 border-t border-green-100">
              <h4 className="font-medium text-green-900 mb-2">Description</h4>
              <p className="text-green-700">{product.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sales Performance */}
      <Card className="bg-white border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Sales Performance
          </CardTitle>
          <CardDescription className="text-green-700">
            Sales metrics and performance data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-900">
                {salesData.totalSold}
              </div>
              <div className="text-sm text-green-700">Total Sold</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-900">
                ${salesData.revenue}
              </div>
              <div className="text-sm text-blue-700">Revenue</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-900">
                {salesData.avgDailySales}
              </div>
              <div className="text-sm text-purple-700">Avg Daily Sales</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-lg font-bold text-orange-900">
                {salesData.lastSale}
              </div>
              <div className="text-sm text-orange-700">Last Sale</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
