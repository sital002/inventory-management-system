"use client";

import { useState } from "react";
import { InventorySearch } from "./inventory-search";
import { CategoryTable } from "./category-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { IProduct } from "@/app/models/product";
import { ISupplier } from "@/app/models/supplier";
import Link from "next/link";

interface ManageInventoryClientProps {
  products: (IProduct & { supplier: ISupplier })[];
}

export function ManageCategory({ products }: ManageInventoryClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const filteredItems = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesStatus = true;
    if (statusFilter === "in-stock") {
      matchesStatus = item.stockLevel > item.minStockLevel;
    } else if (statusFilter === "low-stock") {
      matchesStatus =
        item.stockLevel <= item.minStockLevel && item.stockLevel > 0;
    } else if (statusFilter === "out-of-stock") {
      matchesStatus = item.stockLevel === 0;
    }

    return matchesSearch && matchesStatus;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "stock":
        return b.stockLevel - a.stockLevel;
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
        <Link href={`/dashboard/products/new`}>
          <Button className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden xs:inline">Add Item</span>
            <span className="xs:hidden">Add</span>
          </Button>
        </Link>
      </div>

      <CategoryTable items={sortedItems} />
    </>
  );
}
