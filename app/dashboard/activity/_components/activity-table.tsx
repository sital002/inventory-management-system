import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ShoppingCart,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  Package,
} from "lucide-react";
import { IActivity } from "@/models/activity";

interface ActivityTableProps {
  activities: IActivity[];
}

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

const getActivityBadge = (type: string) => {
  switch (type) {
    case "sale":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Sale
        </Badge>
      );
    case "refund":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Refund
        </Badge>
      );
    case "stock_in":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          Stock In
        </Badge>
      );
    case "stock_out":
      return (
        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
          Stock Out
        </Badge>
      );
    case "price_change":
      return (
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
          Price Change
        </Badge>
      );
    case "low_stock":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Low Stock
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
          Activity
        </Badge>
      );
  }
};

export function ActivityTable({ activities }: ActivityTableProps) {
  if (activities.length === 0) {
    return (
      <Card className="border-green-200">
        <CardContent className="p-12 text-center">
          <Package className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-green-900 mb-2">
            No activities found
          </h3>
          <p className="text-green-600">
            Try adjusting your search or filter criteria.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-green-200">
      <CardContent className="p-0">
        <div className="space-y-4 p-6">
          {activities.map((activity) => (
            <div
              key={activity._id.toString()}
              className="flex items-center space-x-4 p-4 rounded-lg border border-green-100 hover:bg-green-50 transition-colors"
            >
              <Avatar className="h-10 w-10 bg-green-100">
                <AvatarFallback className="text-green-700">
                  {getActivityIcon(activity.type)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-green-900">
                  {activity.note}
                </p>
                <div className="flex items-center space-x-2 text-xs text-green-600">
                  <span>by {activity?.user.name}</span>
                  <span>•</span>
                  <span>{new Date(activity.createdAt).toISOString()}</span>
                  {activity.product.name && (
                    <>
                      <span>•</span>
                      <span className="font-medium">
                        {activity.product.name}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {activity.amount && (
                  <div className="text-right">
                    <div
                      className={`text-sm font-medium ${
                        activity.type === "sale"
                          ? "text-green-600"
                          : activity.type === "refund"
                          ? "text-red-600"
                          : "text-green-900"
                      }`}
                    >
                      {activity.type === "refund" ? "-" : "+"}$
                      {activity.amount.toFixed(2)}
                    </div>
                    {activity.quantity && (
                      <div className="text-xs text-green-600">
                        Qty: {activity.quantity}
                      </div>
                    )}
                  </div>
                )}
                {getActivityBadge(activity.type)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
