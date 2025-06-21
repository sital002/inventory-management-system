"use client";

import { Search, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CategorySearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export function CategorySearch({
  searchTerm,
  setSearchTerm,
  viewMode,
  setViewMode,
  setSortBy,
}: CategorySearchProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-4 w-4" />
        <Input
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-400"
        />
      </div>

      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSortBy("name")}>
              Name
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("items")}>
              Item Count
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("value")}>
              Total Value
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("lowStock")}>
              Low Stock
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex border border-green-200 rounded-md">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={
              viewMode === "grid"
                ? "bg-green-600 hover:bg-green-700"
                : "text-green-700 hover:bg-green-50"
            }
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className={
              viewMode === "list"
                ? "bg-green-600 hover:bg-green-700"
                : "text-green-700 hover:bg-green-50"
            }
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
