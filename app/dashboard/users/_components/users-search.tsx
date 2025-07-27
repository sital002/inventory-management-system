"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface UsersSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function UsersSearch({ searchTerm, onSearchChange }: UsersSearchProps) {
  return (
    <div className="flex items-center gap-4 w-full">
      <div className="relative flex-1 w-full mr-3">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-500" />
        <Input
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500 w-full"
        />
      </div>
    </div>
  );
}
