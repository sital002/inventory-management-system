import React from "react";
import { ProductDetail } from "../_components/product-detail";
import { deleteProduct, getProductDetail } from "@/actions/product";

export default async function page({ params }: { params: { id: string } }) {
  const result = await getProductDetail(params.id);
  if (!result.success) return <div>Error: {result.error}</div>;

  return (
    <div>
      <ProductDetail product={result.data} deleteProduct={deleteProduct} />
    </div>
  );
}
