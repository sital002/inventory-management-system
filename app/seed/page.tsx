import Supplier from "@/models/supplier";
import React from "react";
import Category from "@/models/category";
import Product from "@/models/product";

import suppliers from "./_data/inventory.suppliers.json";
import categories from "./_data/inventory.categories.json";
import products from "./_data/products.json";

export default async function page() {
  await Supplier.deleteMany({});
  await Category.deleteMany({});
  await Product.deleteMany({});
  const seededSupliers = await Supplier.insertMany(suppliers);
  const seededCategories = await Category.insertMany(categories);
  const seeededProducts = await Product.insertMany(products);
  return (
    <div>
      {seededSupliers ? "Suppliers seeded successfully" : null}
      {seededCategories ? "Categories seeded successfully" : null}
      {seeededProducts ? "Products seeded successfully" : null}
    </div>
  );
}
