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

interface ActivitySearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
}

export function ActivitySearch({
  searchTerm,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
}: ActivitySearchProps) {
  return (
    <Card className="border-green-200">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-4 w-4" />
            <Input
              placeholder="Search activities, users, or products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <Select value={typeFilter} onValueChange={onTypeFilterChange}>
            <SelectTrigger className="w-full sm:w-48 border-green-200 focus:border-green-500 focus:ring-green-500">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              <SelectItem value="sale">Sales</SelectItem>
              <SelectItem value="refund">Refunds</SelectItem>
              <SelectItem value="stock_in">Stock In</SelectItem>
              <SelectItem value="stock_out">Stock Out</SelectItem>
              <SelectItem value="price_change">Price Changes</SelectItem>
              <SelectItem value="low_stock">Low Stock Alerts</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-green-600 hover:bg-green-700">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
