export default function ProductActivityLoading() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white border border-green-200 rounded-lg p-4 sm:p-6">
        <div className="h-5 sm:h-6 bg-green-200 rounded animate-pulse mb-2 w-24 sm:w-32"></div>
        <div className="h-3 sm:h-4 bg-green-100 rounded animate-pulse mb-4 w-32 sm:w-48"></div>
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-12 bg-green-50 rounded animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-green-200 rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="h-5 sm:h-6 bg-green-200 rounded animate-pulse mb-2 w-24 sm:w-32"></div>
            <div className="h-3 sm:h-4 bg-green-100 rounded animate-pulse w-32 sm:w-48"></div>
          </div>
          <div className="h-8 w-16 bg-green-100 rounded animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-green-50 rounded animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
