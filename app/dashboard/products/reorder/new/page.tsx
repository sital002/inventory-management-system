import { Suspense } from "react";
import { ReOrderForm } from "./_components/reorder-form";
import { ReorderFormLoading } from "./_components/reorder-form-loading";
import { getAllCategories } from "@/actions/category";
import { getPaginatedProducts } from "@/actions/product";

export default async function page() {
  const categoriesResponse = await getAllCategories();
  const productsResponse = await getPaginatedProducts(1, 10);

  if (!categoriesResponse.success) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-red-600">Error</h1>
        <p className="text-red-500 mt-2">{categoriesResponse.error}</p>
      </div>
    );
  }
  if (!productsResponse.success) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-red-600">Error</h1>
        <p className="text-red-500 mt-2">{productsResponse.error}</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-900">
            Restock Inventory
          </h1>
          <p className="text-green-700 mt-2">
            Add stock to your inventory products
          </p>
        </div>
      </div>

      <Suspense fallback={<ReorderFormLoading />}>
        <ReOrderForm
          categories={categoriesResponse.data}
          initialProducts={productsResponse.data.products}
        />
      </Suspense>
    </div>
  );
}
