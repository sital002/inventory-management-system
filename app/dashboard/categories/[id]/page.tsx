import { Suspense } from "react";
import { categories } from "@/lib/data";
import { notFound } from "next/navigation";
import { StatsLoading } from "@/components/stats-loading";
import { InventoryStatsAsync } from "../_components/inventory-stats";
import { ManageCategory } from "../_components/manage-category";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ManageInventoryPage({ params }: PageProps) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const categoryId = Number.parseInt(params.id);
  const category = categories.find((cat) => cat.id === categoryId);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-green-50/30 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-green-900">
                {category.name} Inventory
              </h1>
              <p className="text-green-700 mt-1">{category.description}</p>
            </div>
            <div
              className={`px-4 py-2 rounded-lg ${category.color} border-2 w-fit`}
            >
              <span className="text-sm font-medium text-green-800">
                Category
              </span>
            </div>
          </div>
        </div>

        <Suspense fallback={<StatsLoading />}>
          <InventoryStatsAsync categoryId={categoryId} />
        </Suspense>

        <ManageCategory category={category} />
      </div>
    </div>
  );
}
