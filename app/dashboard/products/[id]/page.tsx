import { Suspense } from "react";
import { ProductDetailsAsync } from "./_components/product-details-async";
import { ProductStatsAsync } from "./_components/product-stats-async";
import { ProductActivityAsync } from "./_components/product-activity-async";

import ProductStatsLoading from "./_components/product-stats-loading";
import ProductDetailsLoading from "./_components/product-details-loading";
import ProductActivityLoading from "./_components/product-activity-loading";
import { getProductDetail } from "@/actions/product";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getProductDetail(id);
  if (!result.success) {
    return <p>Error: {result.error}</p>;
  }

  const product = result.data;

  return (
    <div className="min-h-screen bg-green-50/30 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-green-900">
                {product.name}
              </h1>
              <p className="text-green-700 mt-1">SKU: {product.sku}</p>
              <p className="text-green-600 text-sm mt-1">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        <Suspense fallback={<ProductStatsLoading />}>
          <ProductStatsAsync product={product} />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2">
            <Suspense fallback={<ProductDetailsLoading />}>
              <ProductDetailsAsync product={product} />
            </Suspense>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <Suspense fallback={<ProductActivityLoading />}>
              <ProductActivityAsync productId={product._id.toString()} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
