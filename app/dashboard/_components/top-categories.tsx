import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, ExternalLink } from "lucide-react";
import { categories } from "@/lib/data";
import Link from "next/link";

export async function TopCategories() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const topCategories = categories
    .sort((a, b) => b.totalValue - a.totalValue)
    .slice(0, 5)
    .map((category, index) => ({
      ...category,
      rank: index + 1,
    }));

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
          <Link href="/categories">
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
        <div className="space-y-3">
          {topCategories.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`}>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    {category.rank}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">
                      {category.name}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {category.itemCount} items
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 text-sm">
                    ${category.totalValue.toLocaleString()}
                  </p>
                  {category.lowStockItems > 0 && (
                    <p className="text-xs text-red-600">
                      {category.lowStockItems} low stock
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
