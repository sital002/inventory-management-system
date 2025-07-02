import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Package, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getLowStockProducts } from "@/actions/product";

export async function LowStockAlerts() {
  const lowStockItems = await getLowStockProducts();

  const getStockStatus = (item: (typeof lowStockItems)[0]) => {
    if (item.currentStock === 0) {
      return {
        label: "Out of Stock",
        color: "bg-red-100 text-red-800 border-red-200",
      };
    } else if (item.currentStock <= item.lowStockThreshold) {
      return {
        label: "Low Stock",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      };
    }
    return {
      label: "In Stock",
      color: "bg-green-100 text-green-800 border-green-200",
    };
  };

  return (
    <Card className="bg-white border-green-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-green-900 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Low Stock Alerts
            </CardTitle>
            <CardDescription className="text-green-700">
              Items that need immediate attention
            </CardDescription>
          </div>
          <Link href="/inventory/alerts">
            <Button
              variant="outline"
              size="sm"
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              View All
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {lowStockItems.length > 0 ? (
          <div className="space-y-3">
            {lowStockItems.map((item) => {
              const status = getStockStatus(item);
              return (
                <div
                  key={item._id.toString()}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start gap-3 mb-2 sm:mb-0">
                    <Package className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {item.category.name} • SKU: {item.sku}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Stock:{" "}
                        <span className="font-medium">{item.currentStock}</span>{" "}
                        / Threshold: {item.lowStockThreshold}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${status.color} border text-xs`}>
                      {status.label}
                    </Badge>
                    <Link href={`/categories/${item.category._id.toString()}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-green-200 hover:bg-green-50"
                      >
                        Restock
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-green-300 mx-auto mb-4" />
            <p className="text-green-600">All items are well stocked!</p>
            <p className="text-green-500 text-sm">
              No low stock alerts at this time
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
