"use client";

import { useState, useMemo } from "react";
import { UsersStats } from "./users-stats";
import { UsersSearch } from "./users-search";
import { UsersTable } from "./users-table";
import { AddUserDialog } from "./add-user-dialog";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Pagination } from "../../../../components/pagination";
import { getUsers, registerUser } from "@/actions/auth";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 15;

interface UserClientProps {
  users: Awaited<ReturnType<typeof getUsers>>;
}
export function UsersClient({ users }: UserClientProps) {
  // const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleAddUser = async (newUser: { name: string; email: string }) => {
    const user = {
      _id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    // setUsers([user, ...users]);
    const result = await registerUser(newUser.name, newUser.email, "Test1234");
    console.log(result);
    if (!result.success) {
      setError(result.error);
      return;
    }
    handleClose();
    router.refresh();
  };

  const handleClose = () => {
    setError("");
    setShowAddDialog(false);
  };

  return (
    <div className="space-y-6">
      <UsersStats users={users} />

      <div className="flex items-center justify-between">
        <UsersSearch
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        <Button
          onClick={() => setShowAddDialog(true)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <UsersTable users={paginatedUsers} />

      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={filteredUsers.length}
        itemsPerPage={ITEMS_PER_PAGE}
      />

      <AddUserDialog
        error={error}
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddUser={handleAddUser}
        handleClose={handleClose}
      />
    </div>
  );
}
