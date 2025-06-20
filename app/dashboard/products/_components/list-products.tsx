"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { getPaginatedProducts } from "@/actions/product";
import { IProduct } from "@/app/models/product";
import { ProductCard } from "./product-card";
import { Input } from "@/components/ui/input";

export function ListProducts({
  initialProducts,
  totalPages,
  initialPage,
  itemsPerPage,
}: {
  initialProducts: IProduct[];
  totalPages: number;
  initialPage: number;
  itemsPerPage: number;
}) {
  const [products, setProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPage, setTotalPage] = useState(totalPages);
  const [searchTerm, setSearchTerm] = useState("");

  type Options = {
    searchTerm?: string;
    category?: string;
  };
  const fetchProducts = async (page: number, options?: Options) => {
    const result = await getPaginatedProducts(page, itemsPerPage, options);
    console.log(result);
    if (result.success) {
      setProducts(result.data.products);
      setTotalPage(result.data.pages);
      setCurrentPage(page);
    } else {
      console.log(result.error);
      setProducts([]);
      setTotalPage(0);
      setCurrentPage(1);
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      await fetchProducts(nextPage);
    }
  };

  const handlePreviousPage = async () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      await fetchProducts(prevPage);
    }
  };

  async function handleSearch(e: FormEvent) {
    if (searchTerm.trim() === "") {
      setProducts(initialProducts);
      setCurrentPage(initialPage);
      return;
    }
    await fetchProducts(1, {
      searchTerm: searchTerm.trim(),
    });
  }

  return (
    <div>
      <form onSubmit={e} className="flex gap-2">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="mb-4"
        />
        <Button>Search</Button>
      </form>
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
