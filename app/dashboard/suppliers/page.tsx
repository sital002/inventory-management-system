import { getAllSuppliers } from "@/actions/supplier";
import React from "react";
import { SuppliierTable } from "./_components/supplier-table";
import { supplierColumns } from "./_components/columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function page() {
  const data = await getAllSuppliers();
  if (!data.success) return <p>{data.error}</p>;
  return (
    <div className="my-2">
      <div className="ml-auto w-fit my-2 mr-2">
        <Link href={"/dashboard/suppliers/new"}>
          <Button>Add New</Button>
        </Link>
      </div>
      <SuppliierTable columns={supplierColumns} data={data.data} />;
    </div>
  );
}
