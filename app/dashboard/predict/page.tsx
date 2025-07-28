import React from "react";
import { isAuthenticated } from "@/actions/auth";
import { redirect } from "next/navigation";
import ProductDemandTable from "./_components/product-demand-table";
import { forcastSellingUnit } from "@/actions/product";

export default async function page() {
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) redirect("/");

  const product = await forcastSellingUnit();
  console.log(product);

  return (
    <div className="m-3">
      <ProductDemandTable productSellingUnit={product}/>
    </div>
  );
}
