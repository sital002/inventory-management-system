import { addNewProduct } from "@/actions/product";
import React from "react";

export default async function page() {
  const result = await addNewProduct({
    name: "new Product " + Math.floor(Math.random() * 10000).toString(),
    price: 400,
    category: "test category",
    description: "This is description",
    supplier: "683bc1e5d8c3a0f92fe668e5",
    costPrice: 5300,
    initialStock: 0,
    minStockLevel: 100,
    maxStockLevel: 1000,
    sku: "SKU" + Math.floor(Math.random() * 10000).toString(),
  });
  console.log(result);
  // const newSupplier = await addNewSupplier({
  //   name: "Test Supplier",
  //   phone: "1234567890",
  //   email: "test@gmai.com",
  // });
  // console.log(newSupplier);

  return <div>{result.success ? result.data.name : result.error}</div>;
}
