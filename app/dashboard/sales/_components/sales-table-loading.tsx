import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const SalesTableLoading = () => {
  return (
    <Card className="border-green-200">
      <CardHeader className="bg-green-50 border-b border-green-200">
        <div className="h-6 bg-green-200 rounded animate-pulse w-32"></div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-4 bg-green-100 rounded animate-pulse flex-1"></div>
              <div className="h-4 bg-green-100 rounded animate-pulse w-24"></div>
              <div className="h-4 bg-green-100 rounded animate-pulse w-20"></div>
              <div className="h-4 bg-green-100 rounded animate-pulse w-16"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
