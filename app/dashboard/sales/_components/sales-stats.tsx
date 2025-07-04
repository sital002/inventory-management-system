import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingCart, TrendingUp, Calendar, RefreshCw } from "lucide-react"

interface SalesStatsProps {
  todaySales: number
  todayTransactions: number
  weekSales: number
  weekTransactions: number
  monthSales: number
  monthTransactions: number
  averageTransaction: number
  totalRefunds: number
  refundCount: number
}

export function SalesStats({
  todaySales,
  todayTransactions,
  weekSales,
  weekTransactions,
  monthSales,
  monthTransactions,
  averageTransaction,
  totalRefunds,
  refundCount,
}: SalesStatsProps) {
  const stats = [
    {
      title: "Today's Sales",
      value: `$${todaySales.toLocaleString()}`,
      subtitle: `${todayTransactions} transactions`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "This Week",
      value: `$${weekSales.toLocaleString()}`,
      subtitle: `${weekTransactions} transactions`,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "This Month",
      value: `$${monthSales.toLocaleString()}`,
      subtitle: `${monthTransactions} transactions`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Avg Transaction",
      value: `$${averageTransaction.toFixed(2)}`,
      subtitle: "Per sale",
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Refunds",
      value: `$${totalRefunds.toFixed(2)}`,
      subtitle: `${refundCount} refunds`,
      icon: RefreshCw,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">{stat.title}</CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stat.value}</div>
            <p className="text-xs text-green-600 mt-1">{stat.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
