"use client"

import { useState, useMemo } from "react"
import { UsersStats } from "./users-stats"
import { UsersSearch } from "./users-search"
import { UsersTable } from "./users-table"
import { AddUserDialog } from "./add-user-dialog"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import { Pagination } from "../../../../components/pagination"

// Mock data - replace with actual API call
const mockUsers = [
  {
    _id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    createdAt: "2024-01-14T09:15:00Z",
    updatedAt: "2024-01-14T09:15:00Z",
  },
  {
    _id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    createdAt: "2024-01-13T14:45:00Z",
    updatedAt: "2024-01-13T14:45:00Z",
  },
  {
    _id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    createdAt: "2024-01-12T11:20:00Z",
    updatedAt: "2024-01-12T11:20:00Z",
  },
  {
    _id: "5",
    name: "David Brown",
    email: "david.brown@example.com",
    createdAt: "2024-01-11T16:30:00Z",
    updatedAt: "2024-01-11T16:30:00Z",
  },
  {
    _id: "6",
    name: "Lisa Davis",
    email: "lisa.davis@example.com",
    createdAt: "2024-01-10T08:45:00Z",
    updatedAt: "2024-01-10T08:45:00Z",
  },
  {
    _id: "7",
    name: "Tom Anderson",
    email: "tom.anderson@example.com",
    createdAt: "2024-01-09T13:15:00Z",
    updatedAt: "2024-01-09T13:15:00Z",
  },
  {
    _id: "8",
    name: "Emily Taylor",
    email: "emily.taylor@example.com",
    createdAt: "2024-01-08T10:00:00Z",
    updatedAt: "2024-01-08T10:00:00Z",
  },
]

const ITEMS_PER_PAGE = 5

export function UsersClient() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddDialog, setShowAddDialog] = useState(false)

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [users, searchTerm])

  // Paginate filtered users
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return filteredUsers.slice(startIndex, endIndex)
  }, [filteredUsers, currentPage])

  // Reset to first page when search changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleAddUser = (newUser: { name: string; email: string }) => {
    const user = {
      _id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setUsers([user, ...users])
    setShowAddDialog(false)
  }

  const handleUpdateUser = (
    userId: string,
    updates: Partial<{
      _id: string
      name: string
      email: string
      createdAt: string
      updatedAt: string
    }>,
  ) => {
    setUsers(
      users.map((user) => (user._id === userId ? { ...user, ...updates, updatedAt: new Date().toISOString() } : user)),
    )
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user._id !== userId))
  }

  return (
    <div className="space-y-6">
      <UsersStats users={users} />

      <div className="flex items-center justify-between">
        <UsersSearch searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <Button onClick={() => setShowAddDialog(true)} className="bg-green-600 hover:bg-green-700 text-white">
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <UsersTable users={paginatedUsers} onDeleteUser={handleDeleteUser} onUpdateUser={handleUpdateUser} />

      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={filteredUsers.length}
        itemsPerPage={ITEMS_PER_PAGE}
      />

      <AddUserDialog open={showAddDialog} onOpenChange={setShowAddDialog} onAddUser={handleAddUser} />
    </div>
  )
}
