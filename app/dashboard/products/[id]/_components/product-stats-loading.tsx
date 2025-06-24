export default function ProductStatsLoading() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white border border-green-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="h-3 sm:h-4 bg-green-100 rounded animate-pulse w-16 sm:w-24"></div>
            <div className="h-4 w-4 sm:h-5 sm:w-5 bg-green-100 rounded animate-pulse"></div>
          </div>
          <div className="h-5 sm:h-6 bg-green-200 rounded animate-pulse w-12 sm:w-16"></div>
        </div>
      ))}
    </div>
  )
}
