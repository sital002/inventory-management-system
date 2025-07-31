import { Suspense } from "react";
import { UsersClient } from "./_components/users-client";
import { UsersLoading } from "./_components/users-loading";
import { getUserData, getUsers } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  const user = await getUserData();
  if (!user) redirect("/");
  if (user.role !== "admin") return <p>You are not admin</p>;
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
