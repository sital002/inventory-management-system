import { getStats } from "@/actions/category";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export async function CategoryStatsAsync() {
  const result = await getStats();
  if (!result.success) {
    console.error("Failed to fetch category stats:", result.error);
    return <div>Error loading category stats</div>;
  }
  const stats = result.data;
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-green-50 border-green-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-700">
            Total Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">
            {stats.totalCategories}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-700">
            Total Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">
            {stats.totalItems.toLocaleString()}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-red-50 border-red-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-red-700">
            Low Stock Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-900">
            {stats.lowStockItems}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-green-50 border-green-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-700">
            Total Value
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">
            ${stats.totalValue.toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
