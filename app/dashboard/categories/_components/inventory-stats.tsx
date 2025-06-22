import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { inventoryItems } from "@/lib/data";

interface InventoryStatsAsyncProps {
  categoryId: number;
}

export async function InventoryStatsAsync({
  categoryId,
}: InventoryStatsAsyncProps) {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const categoryItems = inventoryItems.filter(
    (item) => item.categoryId === categoryId
  );

  const stats = {
    totalItems: categoryItems.length,
    inStock: categoryItems.filter((item) => item.stock > item.lowStockThreshold)
      .length,
    lowStock: categoryItems.filter(
      (item) => item.stock <= item.lowStockThreshold && item.stock > 0
    ).length,
    outOfStock: categoryItems.filter((item) => item.stock === 0).length,
    totalValue: categoryItems.reduce(
      (sum, item) => sum + item.price * item.stock,
      0
    ),
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      <Card className="bg-green-50 border-green-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium text-green-700">
            Total Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold text-green-900">
            {stats.totalItems}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium text-blue-700">
            In Stock
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold text-blue-900">
            {stats.inStock}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium text-yellow-700">
            Low Stock
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold text-yellow-900">
            {stats.lowStock}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-red-50 border-red-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium text-red-700">
            Out of Stock
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold text-red-900">
            {stats.outOfStock}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
