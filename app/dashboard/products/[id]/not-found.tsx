import Link from "next/link"
import { Package, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-green-50/30 p-4 sm:p-6">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <Card className="bg-white border-green-200">
            <CardHeader className="pb-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Package className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-900">Product Not Found</CardTitle>
              <CardDescription className="text-green-700">
                The product you're looking for doesn't exist or may have been removed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-green-600 text-sm">
                This could happen if the product was deleted, the URL is incorrect, or you don't have permission to view
                this product.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/dashboard/products">
                  <Button className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Products
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="border-green-200 text-green-700 hover:bg-green-50 w-full sm:w-auto"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
