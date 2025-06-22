"use client";

import { useState } from "react";
import { InventorySearch } from "./inventory-search";
import { inventoryItems } from "@/lib/data";
import { CategoryTable } from "./category-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Category {
  id: number;
  name: string;
  description: string;
  color: string;
}

interface ManageInventoryClientProps {
  category: Category;
}

export function ManageCategory({ category }: ManageInventoryClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const categoryItems = inventoryItems.filter(
    (item) => item.categoryId === category.id
  );

  const filteredItems = categoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesStatus = true;
    if (statusFilter === "in-stock") {
      matchesStatus = item.stock > item.lowStockThreshold;
    } else if (statusFilter === "low-stock") {
      matchesStatus = item.stock <= item.lowStockThreshold && item.stock > 0;
    } else if (statusFilter === "out-of-stock") {
      matchesStatus = item.stock === 0;
    }

    return matchesSearch && matchesStatus;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "stock":
        return b.stock - a.stock;
      case "price":
        return b.price - a.price;
      case "sku":
        return a.sku.localeCompare(b.sku);
      default:
        return 0;
    }
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex-1 w-full">
          <InventorySearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden xs:inline">Add Item</span>
          <span className="xs:hidden">Add</span>
        </Button>
      </div>

      <CategoryTable items={sortedItems} />
    </>
  );
}
