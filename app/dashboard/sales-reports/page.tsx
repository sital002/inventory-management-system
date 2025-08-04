import { Suspense } from "react";
import { SalesReportsClient } from "./_components/sales-reports-client";
import { SalesReportsLoading } from "./_components/sales-reports-loading";

export default function SalesReportsPage() {
  return (
    <div className="space-y-6 p-3">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sales Reports</h1>
        <p className="text-gray-600 mt-2">
          Comprehensive sales analytics and performance metrics
        </p>
      </div>

      <Suspense fallback={<SalesReportsLoading />}>
        <SalesReportsClient />
      </Suspense>
    </div>
  );
}
