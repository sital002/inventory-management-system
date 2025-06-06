import { getAllSuppliers } from "@/actions/supplier";
import React from "react";

export default async function page() {
  const data = await getAllSuppliers();
  // console.log(data?.data[0]?.id);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Suppliers List</h1>
      {data.success && data.data ? (
        <ul>
          {data.data.map((supplier, index) => (
            <li key={index} className="mb-2">
              <strong>{supplier.name}</strong> - {supplier.email} -{" "}
              {supplier.phone}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-500">{data.error || "No suppliers found"}</p>
      )}
    </div>
  );
}
