"use server";
import Product, { IProduct } from "@/app/models/product";
import Supplier from "@/app/models/supplier";
import { connectToDatabase } from "@/utils/db";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { z } from "zod";
export type Response<T> =
  | { success: true; data: T }
  | { success: false; error: string };

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  sku: z.string().min(1, "SKU is required"),
  costPrice: z.number().positive("Cost price must be a positive number"),
  initialStock: z
    .number()
    .int()
    .nonnegative("Initial stock must be a non-negative integer"),
  minStockLevel: z
    .number()
    .int()
    .nonnegative("Minimum stock must be a non-negative integer"),
  maxStockLevel: z
    .number()
    .int()
    .nonnegative("Minimum stock must be a non-negative integer"),
  supplier: z
    .string()
    .refine(
      (id) => mongoose.Types.ObjectId.isValid(id),
      "Supplier ID must be a valid Mongoose ObjectId"
    ),
});

export async function addNewProduct(
  product: z.infer<typeof productSchema>
): Promise<Response<IProduct>> {
  try {
    await connectToDatabase();
    const result = productSchema.safeParse(product);
    if (!result.success) {
      throw new Error(result.error.errors[0].path.toString());
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
      minStockLevel: result.data.minStockLevel,
      stockLevel: result.data.initialStock,
      costPrice: result.data.costPrice,
      sku: result.data.sku,
      category: result.data.category,
      supplier: result.data.supplier,
      maxStockLevel: result.data.maxStockLevel,
    });
    if (!newProduct) {
      throw new Error("Failed to create product");
    }
    return { success: true, data: JSON.parse(JSON.stringify(newProduct)) };
  } catch (error) {
    console.log(error instanceof mongoose.mongo.MongoServerError);
    if (
      error instanceof mongoose.mongo.MongoServerError &&
      error.code === 11000
    ) {
      console.error("Duplicate key error:", error);
      return {
        success: false,
        error: `Duplicate key error: A product with the same SKU (${error.keyValue.sku}) already exists. Please use a different SKU.`,
      };
    }
    console.error("Error adding new product:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function getProductDetail(
  id: string
): Promise<Response<IProduct>> {
  try {
    await connectToDatabase();
    const product = await Product.findOne({ _id: id }).populate("supplier");
    if (!product) {
      return {
        success: false,
        error: "Product not found",
      };
    }
    return { success: true, data: JSON.parse(JSON.stringify(product)) };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "An unexpected error occurred",
    };
  }
}

type Filters = {
  searchTerm?: string;
  category?: string;
};
export async function getPaginatedProducts(
  page: number = 1,
  limit: number = 10,
  options: Filters = {}
): Promise<Response<{ products: IProduct[]; total: number; pages: number }>> {
  try {
    await connectToDatabase();
    await Supplier.exists({});
    const skip = (page - 1) * limit;

    if (page < 1 || limit < 1) {
      return {
        success: false,
        error: "Page and limit must be greater than 0",
      };
    }
    const searchTerm = options.searchTerm ? options.searchTerm.trim() : "";

    const products = await Product.find({
      name: { $regex: searchTerm, $options: "i" },
      category: options.category ? options.category : { $exists: true },
    })
      .populate("supplier")
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Product.countDocuments({
      name: { $regex: options.searchTerm || "", $options: "i" },
      category: options.category ? options.category : { $exists: true },
    });

    const pages = Math.ceil(total / limit);

    return {
      success: true,
      data: {
        products: JSON.parse(JSON.stringify(products)),
        total,
        pages,
      },
    };
  } catch (error) {
    console.error("Error fetching paginated products:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
