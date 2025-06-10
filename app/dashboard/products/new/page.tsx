import React from "react";
import ProductForm from "./_components/product-form";
import { addNewProduct } from "@/actions/product";

export default function page() {
  return (
    <div>
      <ProductForm addNewProduct={addNewProduct} />
    </div>
  );
}
