import { getActivitiesStats } from "@/actions/activity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ShoppingCart, Package } from "lucide-react";

export async function ActivityStats() {
  const stats = await getActivitiesStats();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-900">
            Total Activities
          </CardTitle>
          <Activity className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">
            {stats.data?.totalActivities}
          </div>
          <p className="text-xs text-green-600">All time activities</p>
        </CardContent>
      </Card>

      <Card className="border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-900">
            Today's Activities
          </CardTitle>
          <Activity className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">
            {stats.data?.todayActivities}
          </div>
          <p className="text-xs text-green-600">Activities today</p>
        </CardContent>
      </Card>

      <Card className="border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-900">
            Sales Activities
          </CardTitle>
          <ShoppingCart className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">
            {stats.data?.salesActivities}
          </div>
          <p className="text-xs text-green-600">Sales transactions</p>
        </CardContent>
      </Card>

      <Card className="border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-900">
            Stock Activities
          </CardTitle>
          <Package className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">
            {stats.data?.stockActivities}
          </div>
          <p className="text-xs text-green-600">Stock movements</p>
        </CardContent>
      </Card>
    </div>
  );
}
