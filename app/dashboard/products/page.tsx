import { getPaginatedProducts } from "@/actions/product";
import React from "react";
import { ListProducts } from "./_components/list-products";
import { isAuthenticated } from "@/actions/auth";
import { redirect } from "next/navigation";

const nitialPage = 1;
const limit = 8;

export default async function page() {
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) redirect("/");

  const result = await getPaginatedProducts(nitialPage, limit);
  if (!result.success) {
    return <p>{result.error}</p>;
  }
  return (
    <div className="m-3">
      <ListProducts
        initialProducts={result.data.products}
        totalPages={result.data.pages}
        initialPage={nitialPage}
        itemsPerPage={limit}
      />
    </div>
  );
}
