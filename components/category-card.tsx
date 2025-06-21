import Link from "next/link"
import { Package, AlertTriangle, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface CategoryCardProps {
  category: {
    id: number
    name: string
    description: string
    itemCount: number
    lowStockItems: number
    totalValue: number
    color: string
  }
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.id}`}>
      <Card
        className={`${category.color} hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer border-2`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <Package className="h-8 w-8 text-green-600" />
            {category.lowStockItems > 0 && (
              <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {category.lowStockItems} low
              </Badge>
            )}
          </div>
          <CardTitle className="text-green-900 text-lg">{category.name}</CardTitle>
          <CardDescription className="text-green-700">{category.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-green-700">Items:</span>
              <span className="font-medium text-green-900">{category.itemCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-700">Value:</span>
              <span className="font-medium text-green-900">${category.totalValue.toLocaleString()}</span>
            </div>
          </div>
          <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
            <DollarSign className="h-4 w-4 mr-2" />
            Manage Inventory
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
