import { Suspense } from "react";
import { DashboardCardLoading } from "./_components/dashboard-card-loading";
import { DashboardStats } from "./_components/dashboard-card";
import { DashboardStatsLoading } from "./_components/dashboard-stats-loading";
import { LowStockAlerts } from "./_components/low-alert-stock";
import { QuickActions } from "./_components/quick-actios";
import { RecentActivity } from "./_components/recent-activity-stats";
import { TopCategories } from "./_components/top-categories";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-green-50/30 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-900">
            Inventory Dashboard
          </h1>
          <p className="text-green-700 mt-1">
            Monitor your supermarket inventory and operations
          </p>
        </div>

        <Suspense fallback={<DashboardStatsLoading />}>
          <DashboardStats />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <Suspense
              fallback={<DashboardCardLoading title="Low Stock Alerts" />}
            >
              <LowStockAlerts />
            </Suspense>

            <Suspense
              fallback={<DashboardCardLoading title="Recent Activity" />}
            >
              <RecentActivity />
            </Suspense>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <Suspense fallback={<DashboardCardLoading title="Quick Actions" />}>
              <QuickActions />
            </Suspense>

            <Suspense
              fallback={<DashboardCardLoading title="Top Categories" />}
            >
              <TopCategories />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
