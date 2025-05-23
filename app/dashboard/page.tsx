import React from "react";

export default function page() {
  return (
    <>
      <main className="p-4 md:p-6">
        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  Total Products
                </span>
              </div>
              <div className="mt-2">
                <span className="text-3xl font-bold">2,345</span>
              </div>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  Low Stock Items
                </span>
              </div>
              <div className="mt-2">
                <span className="text-3xl font-bold">42</span>
              </div>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  Pending Orders
                </span>
              </div>
              <div className="mt-2">
                <span className="text-3xl font-bold">18</span>
              </div>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  Revenue (Month)
                </span>
              </div>
              <div className="mt-2">
                <span className="text-3xl font-bold">$24,780</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-lg border p-3"
                >
                  <div className="h-10 w-10 rounded-full bg-green-100"></div>
                  <div className="flex-1">
                    <p className="font-medium">Activity {i + 1}</p>
                    <p className="text-sm text-gray-500">
                      Description of activity {i + 1}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">2h ago</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
