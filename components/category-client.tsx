"use client";

import { useState } from "react";
import { CategoryCard } from "./category-card";
import { CategorySearch } from "./category-search";
import { AddCategoryDialog } from "./add-category-dialog";

interface Category {
  id: number;
  name: string;
  description: string;
  itemCount: number;
  lowStockItems: number;
  totalValue: number;
  color: string;
}

interface CategoryClientProps {
  categories: Category[];
}

export function CategoryClient({ categories }: CategoryClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "items":
        return b.itemCount - a.itemCount;
      case "value":
        return b.totalValue - a.totalValue;
      case "lowStock":
        return b.lowStockItems - a.lowStockItems;
      default:
        return 0;
    }
  });

  return (
    <>
      <div className="flex justify-between mb-6 gap-2">
        <div className="w-full">
          <CategorySearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            viewMode={viewMode}
            setViewMode={setViewMode}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>
        <AddCategoryDialog />
      </div>
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }
      >
        {sortedCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {sortedCategories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-green-600 text-lg">
            No categories found matching your search.
          </p>
        </div>
      )}
    </>
  );
}
