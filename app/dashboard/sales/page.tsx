import { Suspense } from "react";
import { SalesStatsAsync } from "./_components/sales-stats-async";
import { SalesTableAsync } from "./_components/sales-table-async";
import { SalesStatsLoading } from "./_components/sales-stats-loading";
import { SalesTableLoading } from "./_components/sales-table-loading";

export default async function SalesHistoryPage() {
  return (
    <div className="min-h-screen bg-green-50/30 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-900">
            Sales History
          </h1>
          <p className="text-green-700 mt-1">
            View and manage completed sales transactions
          </p>
        </div>

        <div className="mb-6 sm:mb-8">
          <Suspense fallback={<SalesStatsLoading />}>
            <SalesStatsAsync />
          </Suspense>
        </div>

        <Suspense fallback={<SalesTableLoading />}>
          <SalesTableAsync />
        </Suspense>
      </div>
    </div>
  );
}
