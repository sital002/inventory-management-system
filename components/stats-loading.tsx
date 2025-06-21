export function StatsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-[150px] border border-green-200 rounded-lg p-4 bg-white"
        >
          <div className="h-4 bg-green-100 rounded animate-pulse mb-2 w-24"></div>
          <div className="h-8 bg-green-200 rounded animate-pulse w-16"></div>
          <div className="h-7 bg-green-200 rounded animate-pulse w-20 mt-3"></div>
        </div>
      ))}
    </div>
  );
}
