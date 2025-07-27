import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Calendar, TrendingUp } from "lucide-react"

interface UsersStatsProps {
  users: { _id: string; name: string; email: string; createdAt: string; updatedAt: string }[]
}

export function UsersStats({ users }: UsersStatsProps) {
  const totalUsers = users.length

  // Calculate users created this week
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const newThisWeek = users.filter((user) => new Date(user.createdAt) >= oneWeekAgo).length

  // Calculate users created this month
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  const newThisMonth = users.filter((user) => new Date(user.createdAt) >= oneMonthAgo).length

  // Calculate active users (users updated in last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const activeUsers = users.filter((user) => new Date(user.updatedAt) >= thirtyDaysAgo).length

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      description: "All registered users",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Users",
      value: activeUsers,
      description: "Active in last 30 days",
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "New This Week",
      value: newThisWeek,
      description: "Users added this week",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "New This Month",
      value: newThisMonth,
      description: "Users added this month",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            <p className="text-xs text-green-600">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
