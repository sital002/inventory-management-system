"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Eye, Edit, Package } from "lucide-react";
import { categories } from "@/lib/dummy-data";
import Link from "next/link";

export function ListProducts({ products }: { products: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || product.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Low Stock":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Out of Stock":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <main className="flex-1 overflow-auto p-4 md:p-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-green-900">
              Products
            </h1>
            <p className="text-gray-500">
              Manage your inventory products and stock levels
            </p>
          </div>
          <Link href="/dashboard/products/new">
            <Button className="bg-green-600 text-white hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="border-green-200 bg-white shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-green-900">Filters</CardTitle>
            <CardDescription>Search and filter your products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search products by name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 border-green-200 focus-visible:ring-green-500"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full md:w-[180px] border-green-200">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-[180px] border-green-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <Card
              key={index}
              className="border-green-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                      <Package className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm font-medium text-green-900 truncate">
                        {product.name}
                      </CardTitle>
                      <p className="text-xs text-gray-500">
                        SKU: {product.sku}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(product.productStatus)}>
                    {product.productStatus}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Category:</span>
                    <span className="font-medium text-green-900">
                      {product.category}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Price:</span>
                    <span className="font-medium text-green-900">
                      ${product.price}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Stock:</span>
                    <span
                      className={`font-medium ${
                        product.stock <= product.minStock
                          ? "text-amber-600"
                          : "text-green-900"
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Supplier:</span>
                    <span className="font-medium text-green-900 truncate">
                      {product.supplier.name}
                    </span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-green-200 text-green-800 hover:bg-green-100 hover:text-green-900"
                    >
                      <Eye className="mr-1 h-3 w-3" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-green-200 text-green-800 hover:bg-green-100 hover:text-green-900"
                    >
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredProducts.length === 0 && (
          <Card className="border-green-200 bg-white shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-green-300 mb-4" />
              <h3 className="text-lg font-medium text-green-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 text-center mb-4">
                No products match your current filters. Try adjusting your
                search criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedStatus("all");
                }}
                className="border-green-200 text-green-800 hover:bg-green-100 hover:text-green-900"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Summary */}
        <Card className="border-green-200 bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-gray-500">Total Products: </span>
                <span className="font-medium text-green-900">
                  {filteredProducts.length}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Active: </span>
                <span className="font-medium text-green-900">
                  {filteredProducts.filter((p) => p.status === "Active").length}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Low Stock: </span>
                <span className="font-medium text-amber-600">
                  {
                    filteredProducts.filter((p) => p.status === "Low Stock")
                      .length
                  }
                </span>
              </div>
              <div>
                <span className="text-gray-500">Out of Stock: </span>
                <span className="font-medium text-red-600">
                  {
                    filteredProducts.filter((p) => p.status === "Out of Stock")
                      .length
                  }
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
