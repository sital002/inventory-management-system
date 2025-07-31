"use client";

import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { getPaginatedProducts } from "@/actions/product";
import { ProductCard } from "./product-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { IProduct } from "@/models/product";
import { ISupplier } from "@/models/supplier";
import { ICategory } from "@/models/category";
import { getCategories } from "@/actions/category";

export function ListProducts({
  initialProducts,
  totalPages,
  initialPage,
  categories,
  itemsPerPage,
}: {
  initialProducts: (IProduct & { supplier: ISupplier } & {
    category: ICategory;
  })[];
  categories: Awaited<ReturnType<typeof getCategories>>;
  totalPages: number;
  initialPage: number;
  itemsPerPage: number;
}) {
  const [products, setProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPage, setTotalPage] = useState(totalPages);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  type Options = {
    searchTerm?: string;
    category?: string;
  };
  const fetchProducts = async (page: number, options?: Options) => {
    const selectedCategory = categories.find(
      (category) => category.name === options?.category
    );
    const result = await getPaginatedProducts(page, itemsPerPage, {
      category: selectedCategory ? selectedCategory._id.toString() : "",
      searchTerm: options?.searchTerm,
    });
    if (result.success) {
      setProducts(result.data.products);
      setTotalPage(result.data.pages);
      setCurrentPage(page);
    } else {
      console.log(result.error);
      setProducts([]);
      setTotalPage(1);
      setCurrentPage(1);
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPage) {
      const nextPage = currentPage + 1;
      await fetchProducts(nextPage, {
        searchTerm: searchTerm.trim(),
        category: selectedCategory !== "all" ? selectedCategory : undefined,
      });
    }
  };

  const handlePreviousPage = async () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      await fetchProducts(prevPage, {
        searchTerm: searchTerm.trim(),
        category: selectedCategory !== "all" ? selectedCategory : undefined,
      });
    }
  };

  async function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetchProducts(1, {
      searchTerm: searchTerm.trim(),
      category: selectedCategory !== "all" ? selectedCategory : undefined,
    });
  }

  return (
    <div>
      <div className="flex gap-3">
        <form onSubmit={handleSearch} className="flex gap-2 w-full">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="mb-4"
          />
          <Button>Search</Button>
        </form>
        <Select
          value={selectedCategory}
          onValueChange={async (value) => {
            setSelectedCategory(value);
            await fetchProducts(1, {
              searchTerm: searchTerm.trim(),
              category: value !== "all" ? value : undefined,
            });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category._id.toString()} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Link href={"/dashboard/products/new"}>
          <Button>Add New</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      {products.length > 0 ? (
        <div className="flex gap-3 justify-center items-center mt-4">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPage}
          </span>
          <Button
            variant="outline"
            disabled={currentPage === totalPage}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </div>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}
