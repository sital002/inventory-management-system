import { LoadingSpinner } from "@/components/loading-spinner";

export default function Loading() {
  return (
    <div className="min-h-screen bg-green-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="h-8 bg-green-200 rounded animate-pulse mb-2 w-64"></div>
          <div className="h-4 bg-green-100 rounded animate-pulse w-96"></div>
        </div>

        {/* Stats Loading */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-green-200 rounded-lg p-4"
            >
              <div className="h-4 bg-green-100 rounded animate-pulse mb-2 w-24"></div>
              <div className="h-8 bg-green-200 rounded animate-pulse w-16"></div>
            </div>
          ))}
        </div>

        {/* Search Loading */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 h-10 bg-green-100 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-green-100 rounded animate-pulse"></div>
          <div className="h-10 w-20 bg-green-100 rounded animate-pulse"></div>
        </div>

        {/* Categories Loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-green-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="h-8 w-8 bg-green-100 rounded animate-pulse"></div>
                <div className="h-6 w-16 bg-red-100 rounded animate-pulse"></div>
              </div>
              <div className="h-6 bg-green-200 rounded animate-pulse mb-2 w-32"></div>
              <div className="h-4 bg-green-100 rounded animate-pulse mb-4 w-full"></div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <div className="h-4 bg-green-100 rounded animate-pulse w-12"></div>
                  <div className="h-4 bg-green-100 rounded animate-pulse w-8"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-green-100 rounded animate-pulse w-12"></div>
                  <div className="h-4 bg-green-100 rounded animate-pulse w-16"></div>
                </div>
              </div>
              <div className="h-8 bg-green-100 rounded animate-pulse w-full"></div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <LoadingSpinner />
        </div>
      </div>
    </div>
  );
}
