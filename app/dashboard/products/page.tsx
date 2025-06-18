import { getPaginatedProducts } from "@/actions/product";
import React from "react";
import { ListProducts } from "./_components/list-products";

export default async function page() {
  const page = 1;
  const limit = 8;

  const result = await getPaginatedProducts(page, limit);
  if (!result.success) {
    return <p>{result.error}</p>;
  }
  return (
    <div className="m-3">
      <ListProducts
        initialProducts={result.data.products}
        totalPages={result.data.pages}
        initialPage={page}
        itemsPerPage={limit}
      />
    </div>
  );
}
