"use client";

import { Search, Scan } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ICategory } from "@/models/category";

interface ProductSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  handleSearch: (term: string, category?: string) => void;
  onCategoryChange: (category: string) => void;
  categories: ICategory[];
}

export function ProductSearch({
  searchTerm,
  onSearchChange,
  handleSearch,
  selectedCategory,
  onCategoryChange,
  categories,
}: ProductSearchProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };
  return (
    <Card className="bg-white border-green-200">
      <CardHeader>
        <CardTitle className="text-green-900">Product Search</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-4 w-4" />
            <Input
              placeholder="Search by name, SKU, or barcode..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-400"
            />
          </div>
          <Button>Search</Button>
        </form>

        <div className="flex gap-4">
          <div className="flex-1">
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="border-green-200 focus:border-green-400 focus:ring-green-400">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem
                    key={category._id.toString()}
                    value={category._id.toString()}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
            onClick={() => {
              // alert("Barcode scanner would open here");
            }}
          >
            <Scan className="h-4 w-4 mr-2" />
            Scan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
