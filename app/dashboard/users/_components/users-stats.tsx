import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Shield, UserCheck, Clock } from "lucide-react"

interface UsersStatsProps {
  users: Array<{
    _id: string
    name: string
    email: string
    role: "admin" | "user"
    createdAt: string
    updatedAt: string
  }>
}

export function UsersStats({ users }: UsersStatsProps) {
  const totalUsers = users.length
  const adminUsers = users.filter((user) => user.role === "admin").length
  const regularUsers = users.filter((user) => user.role === "user").length
  const recentUsers = users.filter((user) => {
    const createdDate = new Date(user.createdAt)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return createdDate >= weekAgo
  }).length

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      description: "All system users",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Admin Users",
      value: adminUsers,
      description: "Users with admin privileges",
      icon: Shield,
      color: "text-red-600",
    },
    {
      title: "Regular Users",
      value: regularUsers,
      description: "Standard system users",
      icon: UserCheck,
      color: "text-green-600",
    },
    {
      title: "New This Week",
      value: recentUsers,
      description: "Users added in last 7 days",
      icon: Clock,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
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
