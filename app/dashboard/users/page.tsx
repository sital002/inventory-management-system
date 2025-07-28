import { Suspense } from "react";
import { UsersClient } from "./_components/users-client";
import { UsersLoading } from "./_components/users-loading";
import { getUsers } from "@/actions/auth";

export default async function UsersPage() {
  const users = await getUsers();
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-900">User Management</h1>
          <p className="text-green-700">
            Manage system users and their permissions
          </p>
        </div>
      </div>

      <Suspense fallback={<UsersLoading />}>
        <UsersClient users={users} />
      </Suspense>
    </div>
  );
}
