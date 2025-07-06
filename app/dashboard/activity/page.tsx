import { Suspense } from "react";
import { ActivityClient } from "./_components/activity-client";
import { ActivityLoading } from "./_components/activity-loading";
import { ActivityStats } from "./_components/activity-stats";

export default function ActivityPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-green-900">
          Activity Log
        </h2>
      </div>
      <Suspense fallback={<ActivityLoading />}>
        <ActivityStats />
        <ActivityClient />
      </Suspense>
    </div>
  );
}
