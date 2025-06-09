import { getAllProducts } from "@/actions/product";
import React from "react";
import { ListProducts } from "./_components/list-products";

export default async function page() {
  const products = (await getAllProducts()) as any[];
  return (
    <div>
      <ListProducts products={products} />
    </div>
  );
}
