"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Trash2, AlertTriangle } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface DeleteUserDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleteUser: () => void;
}

export function DeleteUserDialog({
  user,
  open,
  onOpenChange,
  onDeleteUser,
}: DeleteUserDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    onDeleteUser();
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-900">
            <Trash2 className="h-5 w-5" />
            Delete User
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Warning:</strong> This will permanently delete the user
            account and all associated data.
          </AlertDescription>
        </Alert>

        <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Name:</span>
            <span className="text-gray-900">{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Email:</span>
            <span className="text-gray-900">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Created:</span>
            <span className="text-gray-900">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete User
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
