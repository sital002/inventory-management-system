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
  RotateCcw,
  TrendingDown,
  DollarSign,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { getActivity } from "@/actions/activity";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const getActivityBadge = (type: string) => {
  switch (type) {
    case "stock_in":
      return (
        <Badge className=" bg-blue-100  text-blue-800 border-blue-200  ">
          Restock
        </Badge>
      );
    case "sale":
      return (
        <Badge className=" bg-green-100  text-green-800  border-green-200">
          Sale
        </Badge>
      );
    case "low_stock":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
          Alert
        </Badge>
      );
    case "refund":
      return (
        <Badge className="bg-red-100 text-red-800 border-red-200">Refund</Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 border-gray-200">
          Activity
        </Badge>
      );
  }
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case "sale":
      return <ShoppingCart className="h-4 w-4" />;
    case "refund":
      return <RotateCcw className="h-4 w-4" />;
    case "stock_in":
      return <TrendingUp className="h-4 w-4" />;
    case "stock_out":
      return <TrendingDown className="h-4 w-4" />;
    case "price_change":
      return <DollarSign className="h-4 w-4" />;
    case "low_stock":
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};
export async function RecentActivity() {
  const result = await getActivity(1, 10);
  if (!result.success) return <p>No activity found</p>;
  const recentActivities = result.data?.activities || [];

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
          <Link href="/dashboard/activity">
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
              key={activity._id.toString()}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
            >
              <div className={`h-5 w-5 mt-0.5 flex-shrink-0 `} />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                  <div className="flex gap-2 items-center">
                    <Avatar className="h-10 w-10 bg-green-100">
                      <AvatarFallback className="text-green-700">
                        {getActivityIcon(activity.type)}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="font-medium text-gray-900 text-sm">
                      {activity.note}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    {getActivityBadge(activity.type)}
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(activity.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
