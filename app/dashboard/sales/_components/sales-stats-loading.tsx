import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const SalesStatsLoading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i} className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="h-4 bg-green-200 rounded animate-pulse w-20"></div>
            <div className="h-8 w-8 bg-green-100 rounded-full animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="h-8 bg-green-200 rounded animate-pulse mb-2"></div>
            <div className="h-3 bg-green-100 rounded animate-pulse w-16"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
