import { LoadingSpinner } from "@/components/loading-spinner";

export default function Loading() {
  return (
    <div className="min-h-screen bg-green-50/30 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <div className="h-6 sm:h-8 bg-green-200 rounded animate-pulse mb-2 w-48 sm:w-64"></div>
              <div className="h-4 bg-green-100 rounded animate-pulse w-64 sm:w-96"></div>
            </div>
            <div className="h-10 w-20 bg-green-100 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-green-200 rounded-lg p-3 sm:p-4"
            >
              <div className="h-3 sm:h-4 bg-green-100 rounded animate-pulse mb-2 w-16 sm:w-24"></div>
              <div className="h-6 sm:h-8 bg-green-200 rounded animate-pulse w-12 sm:w-16"></div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          <div className="flex-1 h-10 bg-green-100 rounded animate-pulse"></div>
          <div className="h-10 w-full sm:w-32 bg-green-100 rounded animate-pulse"></div>
          <div className="h-10 w-full sm:w-32 bg-green-100 rounded animate-pulse"></div>
        </div>

        <div className="bg-white border border-green-200 rounded-lg p-4 sm:p-6">
          <div className="h-5 sm:h-6 bg-green-200 rounded animate-pulse mb-2 w-32 sm:w-48"></div>
          <div className="h-3 sm:h-4 bg-green-100 rounded animate-pulse mb-6 w-48 sm:w-64"></div>

          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-2 sm:gap-4">
                {[...Array(6)].map((_, j) => (
                  <div
                    key={j}
                    className="h-3 sm:h-4 bg-green-100 rounded animate-pulse flex-1"
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <LoadingSpinner />
        </div>
      </div>
    </div>
  );
}
