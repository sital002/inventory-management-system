import { getAllSuppliers } from "@/actions/supplier";
import React from "react";
import { SuppliierTable } from "./_components/supplier-table";
import { supplierColumns } from "./_components/columns";

export default async function page() {
  const data = await getAllSuppliers();
  if (!data.success) return <p>{data.error}</p>;
  return (
    <div className="my-2">
      <SuppliierTable columns={supplierColumns} data={data.data} />;
    </div>
  );
}
