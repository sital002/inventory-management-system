"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { categories, suppliers } from "@/lib/dummy-data";
import Link from "next/link";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    supplier: "",
    price: "",
    cost: "",
    stock: "",
    minStock: "",
    description: "",
    status: "Active",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Product data:", formData);
    alert("Product added successfully!");
  };

  const generateSKU = () => {
    const category = categories.find((c) => c.name === formData.category);
    if (category) {
      const prefix = category.name.substring(0, 2).toUpperCase();
      const random = Math.floor(Math.random() * 9999)
        .toString()
        .padStart(4, "0");
      handleInputChange("sku", `${prefix}-${random}`);
    }
  };

  return (
    <main className="flex-1 overflow-auto p-4 md:p-6">
      <div className="flex flex-col gap-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/products">
            <Button
              variant="outline"
              size="icon"
              className="border-green-200 text-green-800 hover:bg-green-100 hover:text-green-900"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-green-900">
              Add New Product
            </h1>
            <p className="text-gray-500">
              Create a new product in your inventory
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="border-green-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-green-900">
                Basic Information
              </CardTitle>
              <CardDescription>
                Enter the basic details of your product
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-green-900">
                    Product Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="border-green-200 focus-visible:ring-green-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku" className="text-green-900">
                    SKU *
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="sku"
                      placeholder="Enter SKU"
                      value={formData.sku}
                      onChange={(e) => handleInputChange("sku", e.target.value)}
                      className="border-green-200 focus-visible:ring-green-500"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateSKU}
                      className="border-green-200 text-green-800 hover:bg-green-100 hover:text-green-900"
                      disabled={!formData.category}
                    >
                      Generate
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-green-900">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="border-green-200 focus-visible:ring-green-500"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Category and Supplier */}
          <Card className="border-green-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-green-900">
                Category & Supplier
              </CardTitle>
              <CardDescription>
                Select category and supplier for this product
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-green-900">
                    Category *
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger className="border-green-200">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplier" className="text-green-900">
                    Supplier *
                  </Label>
                  <Select
                    value={formData.supplier}
                    onValueChange={(value) =>
                      handleInputChange("supplier", value)
                    }
                  >
                    <SelectTrigger className="border-green-200">
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.name}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing and Inventory */}
          <Card className="border-green-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-green-900">
                Pricing & Inventory
              </CardTitle>
              <CardDescription>
                Set pricing and stock information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-green-900">
                    Selling Price *
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">
                      $
                    </span>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                      className="pl-8 border-green-200 focus-visible:ring-green-500"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost" className="text-green-900">
                    Cost Price *
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">
                      $
                    </span>
                    <Input
                      id="cost"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.cost}
                      onChange={(e) =>
                        handleInputChange("cost", e.target.value)
                      }
                      className="pl-8 border-green-200 focus-visible:ring-green-500"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="stock" className="text-green-900">
                    Initial Stock *
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="0"
                    value={formData.stock}
                    onChange={(e) => handleInputChange("stock", e.target.value)}
                    className="border-green-200 focus-visible:ring-green-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minStock" className="text-green-900">
                    Minimum Stock Level *
                  </Label>
                  <Input
                    id="minStock"
                    type="number"
                    placeholder="0"
                    value={formData.minStock}
                    onChange={(e) =>
                      handleInputChange("minStock", e.target.value)
                    }
                    className="border-green-200 focus-visible:ring-green-500"
                    required
                  />
                </div>
              </div>
              {formData.price && formData.cost && (
                <div className="rounded-md bg-green-50 border border-green-200 p-3">
                  <p className="text-sm text-green-800">
                    <strong>Profit Margin:</strong> $
                    {(
                      Number.parseFloat(formData.price) -
                      Number.parseFloat(formData.cost)
                    ).toFixed(2)}{" "}
                    (
                    {(
                      ((Number.parseFloat(formData.price) -
                        Number.parseFloat(formData.cost)) /
                        Number.parseFloat(formData.price)) *
                      100
                    ).toFixed(1)}
                    %)
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Product Image */}
          <Card className="border-green-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-green-900">Product Image</CardTitle>
              <CardDescription>
                Upload an image for your product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-green-200 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-green-400" />
                <div className="mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-green-200 text-green-800 hover:bg-green-100 hover:text-green-900"
                  >
                    Choose File
                  </Button>
                  <p className="mt-2 text-sm text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card className="border-green-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-green-900">Product Status</CardTitle>
              <CardDescription>
                Set the initial status of your product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="status" className="text-green-900">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger className="border-green-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="bg-green-600 text-white hover:bg-green-700"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Product
            </Button>
            <Link href="/products">
              <Button
                type="button"
                variant="outline"
                className="border-green-200 text-green-800 hover:bg-green-100 hover:text-green-900"
              >
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
