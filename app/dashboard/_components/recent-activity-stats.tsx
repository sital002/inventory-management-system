import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Package,
  ShoppingCart,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export async function RecentActivity() {
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const recentActivities = [
    {
      id: 1,
      type: "restock",
      title: "Organic Bananas restocked",
      description: "Added 50 units to inventory",
      time: "2 minutes ago",
      icon: Package,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "order",
      title: "Customer order completed",
      description: "Order #ORD-2024-001 - $14.46",
      time: "5 minutes ago",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "alert",
      title: "Low stock alert",
      description: "Red Apples below threshold (8 units)",
      time: "15 minutes ago",
      icon: TrendingUp,
      color: "text-yellow-600",
    },
    {
      id: 4,
      type: "restock",
      title: "Whole Milk restocked",
      description: "Added 30 units to inventory",
      time: "1 hour ago",
      icon: Package,
      color: "text-green-600",
    },
    {
      id: 5,
      type: "order",
      title: "Customer order preparing",
      description: "Order #ORD-2024-002 - $18.48",
      time: "2 hours ago",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
  ];

  const getActivityBadge = (type: string) => {
    switch (type) {
      case "restock":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Restock
          </Badge>
        );
      case "order":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            Order
          </Badge>
        );
      case "alert":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Alert
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            Activity
          </Badge>
        );
    }
  };

  return (
    <Card className="bg-white border-green-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-green-900 flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-green-700">
              Latest inventory and order updates
            </CardDescription>
          </div>
          <Link href="/activity">
            <Button
              variant="outline"
              size="sm"
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              View All
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
            >
              <activity.icon
                className={`h-5 w-5 mt-0.5 flex-shrink-0 ${activity.color}`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                  <h4 className="font-medium text-gray-900 text-sm">
                    {activity.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    {getActivityBadge(activity.type)}
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {activity.time}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
