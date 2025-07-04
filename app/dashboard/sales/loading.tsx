import { SalesStatsLoading } from "./_components/sales-stats-loading"
import { SalesTableLoading } from "./_components/sales-table-loading"

export default function Loading() {
  return (
    <div className="min-h-screen bg-green-50/30 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <div className="h-8 bg-green-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 bg-green-100 rounded animate-pulse w-1/3"></div>
        </div>

        <div className="mb-6 sm:mb-8">
          <SalesStatsLoading />
        </div>

        <SalesTableLoading />
      </div>
    </div>
  )
}
