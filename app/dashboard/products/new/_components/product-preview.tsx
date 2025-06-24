"use client";

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
  Snowflake,
  Leaf,
} from "lucide-react";

interface Category {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  taxRate: number;
  color: string;
}

interface Supplier {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  paymentTerms: string;
  isActive: boolean;
}

interface ProductPreviewProps {
  data: {
    name?: string;
    description?: string;
    categoryId?: string;
    supplierId?: string;
    sku?: string;
    brand?: string;
    barcode?: string;
    unit?: string;
    weight?: string;
    dimensions?: string;
    costPrice?: string;
    sellingPrice?: string;
    discountPrice?: string;
    initialStock?: string;
    lowStockThreshold?: string;
    isActive?: boolean;
    trackInventory?: boolean;
    isPerishable?: boolean;
    requiresRefrigeration?: boolean;
    isOrganic?: boolean;
  };
  categories: Category[];
  suppliers: Supplier[];
}

export function ProductPreview({
  data,
  categories,
  suppliers,
}: ProductPreviewProps) {
  const getCategory = (categoryId: string) => {
    return categories.find((cat) => cat.id.toString() === categoryId);
  };

  const getSupplier = (supplierId: string) => {
    return suppliers.find((sup) => sup.id.toString() === supplierId);
  };

  const getStockStatus = () => {
    const stock = Number(data.initialStock) || 0;
    const threshold = Number(data.lowStockThreshold) || 0;

    if (stock === 0) {
      return {
        label: "Out of Stock",
        color: "bg-red-100 text-red-800 border-red-200",
        icon: AlertTriangle,
      };
    } else if (stock <= threshold) {
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

  const category = getCategory(data.categoryId || "");
  const supplier = getSupplier(data.supplierId || "");
  const status = getStockStatus();
  const StatusIcon = status.icon;

  const profitMargin =
    data.costPrice && data.sellingPrice
      ? (
          ((Number(data.sellingPrice) - Number(data.costPrice)) /
            Number(data.sellingPrice)) *
          100
        ).toFixed(2)
      : "0";

  const taxAmount =
    category && data.sellingPrice
      ? (Number(data.sellingPrice) * category.taxRate).toFixed(2)
      : "0";
  const finalPrice =
    category && data.sellingPrice
      ? (Number(data.sellingPrice) * (1 + category.taxRate)).toFixed(2)
      : "0";

  return (
    <Card className="bg-white border-green-200 mt-6">
      <CardHeader>
        <CardTitle className="text-green-900">Product Preview</CardTitle>
        <CardDescription className="text-green-700">
          How this product will appear in your supermarket system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Card Preview */}
          <Card
            className={`${
              category?.color || "bg-gray-50 border-gray-200"
            } border-2`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Package className="h-6 w-6 text-green-600" />
                <div className="flex gap-1">
                  <Badge className={`${status.color} border`}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {status.label}
                  </Badge>
                  {data.isOrganic && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <Leaf className="h-3 w-3 mr-1" />
                      Organic
                    </Badge>
                  )}
                </div>
              </div>
              <CardTitle className="text-green-900 text-lg">
                {data.name || "Product Name"}
              </CardTitle>
              <CardDescription className="text-green-700">
                {data.description || "No description provided"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">SKU:</span>
                  <span className="font-medium text-green-900 font-mono">
                    {data.sku || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">Category:</span>
                  <span className="font-medium text-green-900">
                    {category?.name || "Unknown"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">Stock:</span>
                  <span className="font-medium text-green-900">
                    {data.initialStock || "0"} {data.unit || "units"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">Price:</span>
                  <span className="font-medium text-green-900">
                    ${Number(data.sellingPrice || 0).toFixed(2)}
                    {data.discountPrice && Number(data.discountPrice) > 0 && (
                      <span className="text-red-600 ml-2">
                        (Sale: ${Number(data.discountPrice).toFixed(2)})
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-green-900 mb-2">
                Product Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Brand:</span>
                  <span className="text-green-900">{data.brand || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Barcode:</span>
                  <span className="text-green-900 font-mono">
                    {data.barcode || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Unit:</span>
                  <span className="text-green-900">{data.unit || "N/A"}</span>
                </div>
                {data.weight && (
                  <div className="flex justify-between">
                    <span className="text-green-700">Weight:</span>
                    <span className="text-green-900">{data.weight} kg</span>
                  </div>
                )}
                {data.dimensions && (
                  <div className="flex justify-between">
                    <span className="text-green-700">Dimensions:</span>
                    <span className="text-green-900">{data.dimensions}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-green-900 mb-2">
                Pricing & Profit
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Cost Price:</span>
                  <span className="text-green-900">
                    ${Number(data.costPrice || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Selling Price:</span>
                  <span className="text-green-900">
                    ${Number(data.sellingPrice || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Profit Margin:</span>
                  <span className="text-green-900 font-medium">
                    {profitMargin}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Profit per Unit:</span>
                  <span className="text-green-900 font-medium">
                    $
                    {(
                      Number(data.sellingPrice || 0) -
                      Number(data.costPrice || 0)
                    ).toFixed(2)}
                  </span>
                </div>
                {category && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-green-700">
                        Tax ({(category.taxRate * 100).toFixed(1)}%):
                      </span>
                      <span className="text-green-900">${taxAmount}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span className="text-green-700">
                        Final Price (incl. tax):
                      </span>
                      <span className="text-green-900">${finalPrice}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {supplier && (
              <div>
                <h4 className="font-medium text-green-900 mb-2">
                  Supplier Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Supplier:</span>
                    <span className="text-green-900">{supplier.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Contact:</span>
                    <span className="text-green-900">
                      {supplier.contactPerson}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Payment Terms:</span>
                    <span className="text-green-900">
                      {supplier.paymentTerms}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div>
              <h4 className="font-medium text-green-900 mb-2">
                Product Characteristics
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.isActive && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Active
                  </Badge>
                )}
                {data.trackInventory && (
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    Track Inventory
                  </Badge>
                )}
                {data.isPerishable && (
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                    Perishable
                  </Badge>
                )}
                {data.requiresRefrigeration && (
                  <Badge className="bg-cyan-100 text-cyan-800 border-cyan-200">
                    <Snowflake className="h-3 w-3 mr-1" />
                    Refrigerated
                  </Badge>
                )}
                {data.isOrganic && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <Leaf className="h-3 w-3 mr-1" />
                    Organic
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
