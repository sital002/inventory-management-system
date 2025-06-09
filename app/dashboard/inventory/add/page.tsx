import { addNewProduct } from "@/actions/product";
import AddInventoryItem from "@/components/add-inventory-form";
import React from "react";

export default async function page() {
  try {
    const result = await addNewProduct({
      name: "Test Product",
      price: 400,
      category: "test category",
      description: "This is description",
      supplier: "683bc1abd8c3a0f92fe668db",
      costPrice: 300,
      initialStock: 100,
      minStock: 10,
      productStatus: "active",
      sellingPrice: 500,
      sku: "SKU12345",
    });
    console.log(result);
    // const newSupplier = await addNewSupplier({
    //   name: "Test Supplier",
    //   phone: "1234567890",
    //   email: "test@gmai.com",
    // });
    // console.log(newSupplier);
  } catch (err) {
    console.log(err);
  }
  return (
    <div>
      <AddInventoryItem />
    </div>
  );
}
