"use client";

import { useState } from "react";
import { UsersStats } from "./users-stats";
import { UsersSearch } from "./users-search";
import { UsersTable } from "./users-table";
import { AddUserDialog } from "./add-user-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const usersData = [
  {
    _id: "507f1f77bcf86cd799439011",
    name: "John Smith",
    email: "john.smith@inventorypro.com",
    role: "admin",
    createdAt: "2024-01-10T08:30:00Z",
    updatedAt: "2024-01-15T14:20:00Z",
  },
  {
    _id: "507f1f77bcf86cd799439012",
    name: "Sarah Johnson",
    email: "sarah.johnson@inventorypro.com",
    role: "user",
    createdAt: "2024-01-12T10:15:00Z",
    updatedAt: "2024-01-14T16:45:00Z",
  },
  {
    _id: "507f1f77bcf86cd799439013",
    name: "Mike Wilson",
    email: "mike.wilson@inventorypro.com",
    role: "user",
    createdAt: "2024-01-08T09:20:00Z",
    updatedAt: "2024-01-13T11:30:00Z",
  },
  {
    _id: "507f1f77bcf86cd799439014",
    name: "Emma Davis",
    email: "emma.davis@inventorypro.com",
    role: "admin",
    createdAt: "2024-01-05T14:45:00Z",
    updatedAt: "2024-01-15T09:15:00Z",
  },
  {
    _id: "507f1f77bcf86cd799439015",
    name: "Robert Brown",
    email: "robert.brown@inventorypro.com",
    role: "user",
    createdAt: "2024-01-15T11:00:00Z",
    updatedAt: "2024-01-15T11:00:00Z",
  },
];

export function UsersClient() {
  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleAddUser = (newUser: {
    name: string;
    email: string;
    role: "admin" | "user";
  }) => {
    const user = {
      _id: `507f1f77bcf86cd79943901${users.length + 6}`,
      ...newUser,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setUsers([...users, user]);
    setIsAddDialogOpen(false);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleUpdateUser = (
    userId: string,
    updates: Partial<(typeof usersData)[0]>
  ) => {
    setUsers(
      users.map((user) =>
        user._id === userId
          ? { ...user, ...updates, updatedAt: new Date().toISOString() }
          : user
      )
    );
  };

  return (
    <div className="space-y-6">
      <UsersStats users={users} />

      <div className="flex items-center justify-between gap-4">
        <UsersSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
        />

        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <UsersTable
        users={filteredUsers}
        onDeleteUser={handleDeleteUser}
        onUpdateUser={handleUpdateUser}
      />

      <AddUserDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddUser={handleAddUser}
      />
    </div>
  );
}
