import { LoadingSpinner } from "@/components/loading-spinner";

export default function Loading() {
  return (
    <div className="min-h-screen bg-green-50/30 p-4 sm:p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header Loading */}
        <div className="mb-6 sm:mb-8">
          <div className="h-6 sm:h-8 bg-green-200 rounded animate-pulse mb-2 w-48 sm:w-64"></div>
          <div className="h-4 bg-green-100 rounded animate-pulse w-64 sm:w-96"></div>
        </div>

        {/* Form Loading */}
        <div className="bg-white border border-green-200 rounded-lg p-6">
          <div className="h-6 bg-green-200 rounded animate-pulse mb-2 w-48"></div>
          <div className="h-4 bg-green-100 rounded animate-pulse mb-6 w-64"></div>

          <div className="space-y-6">
            {/* Basic Information Section */}
            <div className="space-y-4">
              <div className="h-5 bg-green-200 rounded animate-pulse w-32"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-green-100 rounded animate-pulse w-24"></div>
                    <div className="h-10 bg-green-50 rounded animate-pulse w-full"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Section */}
            <div className="space-y-4">
              <div className="h-5 bg-green-200 rounded animate-pulse w-24"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-green-100 rounded animate-pulse w-20"></div>
                    <div className="h-10 bg-green-50 rounded animate-pulse w-full"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inventory Section */}
            <div className="space-y-4">
              <div className="h-5 bg-green-200 rounded animate-pulse w-28"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-green-100 rounded animate-pulse w-24"></div>
                    <div className="h-10 bg-green-50 rounded animate-pulse w-full"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <div className="h-10 bg-green-100 rounded animate-pulse flex-1"></div>
              <div className="h-10 bg-green-50 rounded animate-pulse w-24"></div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <LoadingSpinner />
        </div>
      </div>
    </div>
  );
}
