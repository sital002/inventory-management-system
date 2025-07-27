"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface UsersSearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  roleFilter: "all" | "admin" | "user"
  onRoleFilterChange: (value: "all" | "admin" | "user") => void
}

export function UsersSearch({ searchTerm, onSearchChange, roleFilter, onRoleFilterChange }: UsersSearchProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-500" />
        <Input
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <Select value={roleFilter} onValueChange={onRoleFilterChange}>
        <SelectTrigger className="w-32 border-green-200 focus:border-green-500 focus:ring-green-500">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="user">User</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
