export default function ProductDetailsLoading() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-green-200 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="h-5 sm:h-6 bg-green-200 rounded animate-pulse mb-2 w-32 sm:w-48"></div>
            <div className="h-3 sm:h-4 bg-green-100 rounded animate-pulse w-48 sm:w-64"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-16 bg-green-100 rounded animate-pulse"></div>
            <div className="h-8 w-16 bg-green-100 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-5 bg-green-200 rounded animate-pulse w-24"></div>
              <div className="space-y-3">
                {[...Array(6)].map((_, j) => (
                  <div key={j} className="flex justify-between">
                    <div className="h-4 bg-green-100 rounded animate-pulse w-24"></div>
                    <div className="h-4 bg-green-100 rounded animate-pulse w-32"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-green-200 rounded-lg p-4 sm:p-6">
        <div className="h-5 sm:h-6 bg-green-200 rounded animate-pulse mb-4 w-32 sm:w-48"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="text-center p-4 bg-green-50 rounded-lg border border-green-200"
            >
              <div className="h-6 bg-green-200 rounded animate-pulse mb-2 w-12 mx-auto"></div>
              <div className="h-3 bg-green-100 rounded animate-pulse w-16 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
