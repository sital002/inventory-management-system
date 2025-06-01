import Product from "@/app/models/product";
import { connectToDatabase } from "@/utils/db";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  quantity: z
    .number()
    .int()
    .nonnegative("Quantity must be a non-negative integer"),
  category: z.string().min(1, "Category is required"),
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
      throw new Error(result.error.errors.map((e) => e.message).join(", "));
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
      quantity: result.data.quantity,
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
