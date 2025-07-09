"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";
import { FormEvent } from "react";

type FilterType = {
  value:
    | "all"
    | "sale"
    | "refund"
    | "stock_in"
    | "stock_out"
    | "price_change"
    | "low_stock";
  label: string;
};

export const filters: FilterType[] = [
  {
    value: "all",
    label: "All Activities",
  },
  {
    value: "sale",
    label: "Sales",
  },
  {
    value: "refund",
    label: "Refunds",
  },
  {
    value: "stock_in",
    label: "Stock In",
  },
  {
    value: "stock_out",
    label: "Stock Out",
  },
  {
    value: "price_change",
    label: "Price Changes",
  },
  {
    value: "low_stock",
    label: "Low Stock Alerts",
  },
];

interface ActivitySearchProps {
  searchTerm: string;
  handleSearch: (e: FormEvent) => void;
  onSearchChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: FilterType["value"]) => void;
}
export function ActivitySearch({
  searchTerm,
  handleSearch,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
}: ActivitySearchProps) {
  return (
    <Card className="border-green-200">
      <CardContent className="p-6">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-4 w-4" />
            <Input
              placeholder="Search activities, users, or products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <Select
            value={typeFilter}
            onValueChange={(value) => {
              const selectedFilter = filters.find(
                (filter) => filter.value === value
              );
              if (selectedFilter) {
                onTypeFilterChange(selectedFilter.value);
              }
            }}
          >
            <SelectTrigger className="w-full sm:w-48 border-green-200 focus:border-green-500 focus:ring-green-500">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              {filters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="bg-green-600 hover:bg-green-700">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
