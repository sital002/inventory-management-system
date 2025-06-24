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
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface ProductActivityAsyncProps {
  productId: string;
}

export async function ProductActivityAsync({
  productId,
}: ProductActivityAsyncProps) {
  const recentActivity = [
    {
      id: 1,
      type: "sale",
      title: "Product sold",
      description: "2 units sold to customer",
      time: "5 minutes ago",
      icon: ShoppingCart,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "restock",
      title: "Stock updated",
      description: "Added 20 units to inventory",
      time: "2 hours ago",
      icon: Package,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "alert",
      title: "Low stock alert",
      description: "Stock below threshold",
      time: "1 day ago",
      icon: AlertTriangle,
      color: "text-yellow-600",
    },
    {
      id: 4,
      type: "price",
      title: "Price updated",
      description: "Price changed to $4.99",
      time: "3 days ago",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];

  const getActivityBadge = (type: string) => {
    switch (type) {
      case "sale":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Sale
          </Badge>
        );
      case "restock":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            Restock
          </Badge>
        );
      case "alert":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Alert
          </Badge>
        );
      case "price":
        return (
          <Badge className="bg-purple-100 text-purple-800 border-purple-200">
            Price
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

  const quickActions = [
    {
      title: "Reorder Stock",
      description: "Create purchase order",
      icon: Package,
      href: `/dashboard/purchase-orders/new?product=${productId}`,
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "View Sales",
      description: "Sales history & analytics",
      icon: TrendingUp,
      href: `/dashboard/analytics/products/${productId}`,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Price History",
      description: "View pricing changes",
      icon: Clock,
      href: `/dashboard/products/${productId}/pricing`,
      color: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="bg-white border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900">Quick Actions</CardTitle>
          <CardDescription className="text-green-700">
            Common tasks for this product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto p-3 border-gray-200 hover:bg-gray-50 text-left"
                >
                  <action.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900">
                      {action.title}
                    </div>
                    <div className="text-xs text-gray-600">
                      {action.description}
                    </div>
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-green-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-green-900 flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                Recent Activity
              </CardTitle>
              <CardDescription className="text-green-700">
                Latest updates for this product
              </CardDescription>
            </div>
            <Link href={`/dashboard/products/${productId}/activity`}>
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
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
              >
                <activity.icon
                  className={`h-4 w-4 mt-0.5 flex-shrink-0 ${activity.color}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {activity.title}
                      </h4>
                      {getActivityBadge(activity.type)}
                    </div>
                    <p className="text-xs text-gray-600">
                      {activity.description}
                    </p>
                    <span className="text-xs text-gray-500">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
