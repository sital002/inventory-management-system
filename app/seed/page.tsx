import Supplier from "@/models/supplier";
import React from "react";
import Category from "@/models/category";
import Product from "@/models/product";

import suppliers from "./_data/inventory.suppliers.json";
import categories from "./_data/inventory.categories.json";
import products from "./_data/products.json";
import mongoose from "mongoose";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Product = (typeof products)[0];
type Supplier = (typeof suppliers)[0];
type Category = (typeof categories)[0];

const convertToObjectId = (data: (Product | Supplier | Category)[]) => {
  return data.map((item) => {
    if (item._id && item._id.$oid) {
      item._id = new mongoose.Types.ObjectId(item._id.$oid);
    }

    if (item.category && item.category.$oid) {
      item.category = new mongoose.Types.ObjectId(item.category.$oid);
    }
    if (item.supplier && item.supplier.$oid) {
      item.supplier = new mongoose.Types.ObjectId(item.supplier.$oid);
    }

    return item;
  });
};
export default async function page() {
  const convertedSuppliers = convertToObjectId(suppliers);
  const convertedCategories = convertToObjectId(categories);
  const convertedProducts = convertToObjectId(products);

  await Supplier.deleteMany({});
  await Category.deleteMany({});
  await Product.deleteMany({});

  const seededSuppliers = await Supplier.insertMany(convertedSuppliers);
  const seededCategories = await Category.insertMany(convertedCategories);
  const seededProducts = await Product.insertMany(convertedProducts);
  return (
    <div className="m-3">
      {seededSuppliers ? <p>Suppliers seeded successfully</p> : null}
      {seededCategories ? <p>Categories seeded successfully</p> : null}
      {seededProducts ? <p>Products seeded successfully</p> : null}
      <Link href={"/"}>
        <Button>Go to homepage</Button>
      </Link>
    </div>
  );
}
