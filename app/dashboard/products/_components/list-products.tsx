"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { getPaginatedProducts } from "@/actions/product";
import { IProduct } from "@/app/models/product";
import { ProductCard } from "./product-card";

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

  const fetchProducts = async (page: number) => {
    const result = await getPaginatedProducts(page, itemsPerPage);
    if (result.success) {
      setProducts(result.data.products);
    } else {
      console.error(result.error);
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

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      <div className="flex gap-3 justify-center items-center mt-4">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
