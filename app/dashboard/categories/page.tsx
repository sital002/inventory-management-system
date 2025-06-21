import { Suspense } from "react";
import { CategoryStatsAsync } from "@/components/category-stats-async";
import { CategoryListAsync } from "@/components/category-list-async";
import { StatsLoading } from "@/components/stats-loading";
import { CategoriesLoading } from "@/components/categories-loading";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-green-50/30 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-green-900">
            Inventory Categories
          </h1>
          <p className="text-green-700">
            Manage your supermarket inventory by category
          </p>
        </div>

        <Suspense fallback={<StatsLoading />}>
          <CategoryStatsAsync />
        </Suspense>

        <Suspense fallback={<CategoriesLoading />}>
          <CategoryListAsync />
        </Suspense>
      </div>
    </div>
  );
}
