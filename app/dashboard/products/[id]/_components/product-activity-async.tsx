import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getActivity } from "@/actions/activity";
import { getActivityBadge } from "@/utils/activity";

interface ProductActivityAsyncProps {
  productId: string;
}

export async function ProductActivityAsync({
  productId,
}: ProductActivityAsyncProps) {
  const result = await getActivity(1, 5, {
    product: productId,
  });
  const recentActivities = result.data?.activities || [];

  return (
    <div className="space-y-4 sm:space-y-6">
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
            {/* <Link href={`/dashboard//activity?product=${productId}`}>
              <Button
                variant="outline"
                size="sm"
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                View All
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </Link> */}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity._id.toString()}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
              >
                <div className={`h-4 w-4 mt-0.5 flex-shrink-0 `} />

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {activity.note}
                      </h4>
                      {getActivityBadge(activity.type)}
                    </div>
                    <p className="text-xs text-gray-600">{activity.note}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(activity.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
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
