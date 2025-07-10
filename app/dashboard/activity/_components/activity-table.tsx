import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Package } from "lucide-react";
import { IActivity } from "@/models/activity";
import { getActivityBadge, getActivityIcon } from "@/utils/activity";

interface ActivityTableProps {
  activities: IActivity[];
}

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
                {activity.amount ? (
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
                    {activity.quantity ? (
                      <div className="text-xs text-green-600">
                        Qty: {activity.quantity}
                      </div>
                    ) : null}
                  </div>
                ) : null}
                {getActivityBadge(activity.type)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
