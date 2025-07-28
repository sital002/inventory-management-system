"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal, Edit, Trash2, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditUserDialog } from "./edit-user-dialog";
import { DeleteUserDialog } from "./delete-user-dialog";
import { UserType } from "@/models/user";

interface UsersTableProps {
  users: UserType[];
  onDeleteUser: (userId: string) => void;
}

export function UsersTable({ users, onDeleteUser }: UsersTableProps) {
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [deletingUser, setDeletingUser] = useState<{
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  } | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (users.length === 0) {
    return (
      <Card className="border-green-200">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <User className="h-12 w-12 text-green-400 mb-4" />
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            No users found
          </h3>
          <p className="text-green-600 text-center">
            No users match your current search criteria. Try adjusting your
            search.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900">
            Users ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-4 border border-green-100 rounded-lg hover:bg-green-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-green-100 text-green-700">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-green-900">
                        {user.name}
                      </h3>
                    </div>
                    <p className="text-sm text-green-600">{user.email}</p>
                    <p className="text-xs text-green-500">
                      Created: {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-green-100"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => setEditingUser(user)}
                      className="cursor-pointer"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit User
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDeletingUser(user)}
                      className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {editingUser && (
        <EditUserDialog
          user={editingUser}
          open={!!editingUser}
          onOpenChange={(open) => !open && setEditingUser(null)}
        />
      )}

      {deletingUser && (
        <DeleteUserDialog
          user={deletingUser}
          open={!!deletingUser}
          onOpenChange={(open) => !open && setDeletingUser(null)}
          onDeleteUser={() => {
            onDeleteUser(deletingUser._id);
            setDeletingUser(null);
          }}
        />
      )}
    </>
  );
}
