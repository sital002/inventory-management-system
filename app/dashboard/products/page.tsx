import { getAllProducts } from "@/actions/product";
import React from "react";
import { ListProducts } from "./_components/list-products";

export default async function page() {
  const products = (await getAllProducts()) as any[];
  console.log(products[0].name);
  return (
    <div>
      <ListProducts products={products} />
    </div>
  );
}
