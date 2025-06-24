import { Suspense } from "react";
import { StatsLoading } from "@/components/stats-loading";
import { InventoryStats } from "../_components/inventory-stats";
import { ManageCategory } from "../_components/manage-category";
import { getCategory } from "@/actions/category";
import { colorOptions } from "@/utils/color-options";
import { findProductsByCategory } from "@/actions/product";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ManageInventoryPage({ params }: PageProps) {
  const result = await getCategory(params.id);

  if (!result.success)
    return (
      <div className="text-red-500 text-center mt-4">
        {result.error || "Failed to load category"}
      </div>
    );
  const data = await findProductsByCategory(params.id);
  if (!data.success) {
    return (
      <div className="text-red-500 text-center mt-4">
        {data.error || "Failed to load products"}
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-green-50/30 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-green-900">
                {result.data.name} Inventory
              </h1>
              <p className="text-green-700 mt-1">{result.data.description}</p>
            </div>
            <div
              className={`px-4 py-2 rounded-lg ${
                colorOptions.find(
                  (option) => option.label === result.data.color
                )?.value
              } border-2 w-fit`}
            >
              <span className="text-sm font-medium text-green-800">
                Category
              </span>
            </div>
          </div>
        </div>

        <Suspense fallback={<StatsLoading />}>
          <InventoryStats categoryId={result.data._id.toString()} />
        </Suspense>

        <ManageCategory products={data.data} />
      </div>
    </div>
  );
}
