import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { getTopCategories } from "@/actions/category";

export async function TopCategories() {
  const topCategories = await getTopCategories();
  // console.log(topCategories);

  return (
    <Card className="bg-white border-green-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-green-900 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Top Categories
            </CardTitle>
            <CardDescription className="text-green-700">
              By inventory value
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topCategories.map((category, index) => (
            <Link
              key={category._id}
              href={`/dashboard/categories/${category._id}`}
            >
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">
                      {category.name}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {category.totalItems} items
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 text-sm">
                    ${Math.floor(category.totalValue).toFixed(2)}
                  </p>
                  {category.totalLowStockItemsCount > 0 && (
                    <p className="text-xs text-red-600">
                      {category.totalLowStockItemsCount} low stock
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
