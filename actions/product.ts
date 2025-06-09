import Product from "@/app/models/product";
import { connectToDatabase } from "@/utils/db";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  sku: z.string().min(1, "SKU is required"),
  sellingPrice: z.number().positive("Selling price must be a positive number"),
  costPrice: z.number().positive("Cost price must be a positive number"),
  initialStock: z
    .number()
    .int()
    .nonnegative("Initial stock must be a non-negative integer"),
  minStock: z
    .number()
    .int()
    .nonnegative("Minimum stock must be a non-negative integer"),
  productStatus: z.enum(["active", "inactive", "draft"]),
  supplier: z
    .string()
    .refine(
      (id) => mongoose.Types.ObjectId.isValid(id),
      "Supplier ID must be a valid Mongoose ObjectId"
    ),
});

export async function addNewProduct(product: z.infer<typeof productSchema>) {
  try {
    await connectToDatabase();
    const result = productSchema.safeParse(product);
    if (!result.success) {
      throw new Error(result.error.errors[0].path);
    }
    const data = (await cookies()).get("user");

    if (!data) {
      throw new Error("User not authenticated");
    }
    const user = JSON.parse(data.value);
    if (user.role !== "admin") {
      throw new Error("Only admins can add new products");
    }
    const newProduct = await Product.create({
      name: result.data.name,
      description: result.data.description,
      price: result.data.price,
      minStock: result.data.minStock,
      initialStock: result.data.initialStock,
      costPrice: result.data.costPrice,
      sellingPrice: result.data.sellingPrice,
      sku: result.data.sku,
      productStatus: result.data.productStatus,
      category: result.data.category,
      supplier: result.data.supplier,
    });
    if (!newProduct) {
      throw new Error("Failed to create product");
    }
    return newProduct;
  } catch (error) {
    console.error("Error adding new product:", error);
    throw error;
  }
}

export async function getAllProducts() {
  try {
    await connectToDatabase();
    const products = await Product.find().populate("supplier").lean();
    if (!products) {
      throw new Error("No products found");
    }
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
