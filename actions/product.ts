"use server";
import Category, { ICategory } from "@/app/models/category";
import Product, { IProduct } from "@/app/models/product";
import Supplier, { ISupplier } from "@/app/models/supplier";
import { connectToDatabase } from "@/utils/db";
import mongoose, { isValidObjectId } from "mongoose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import { isAuthenticated } from "./auth";
export type Response<T> =
  | { success: true; data: T }
  | { success: false; error: string };

const productSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be less than 100 characters"),
  sku: z
    .string()
    .min(3, "SKU must be at least 3 characters")
    .max(50, "SKU must be less than 50 characters"),
  barcode: z.string().optional().or(z.literal("")),
  categoryId: z.string().min(1, "Please select a category"),
  supplierId: z.string().optional().or(z.literal("")),
  brand: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  unit: z.string().min(1, "Unit is required"),

  costPrice: z
    .string()
    .min(1, "Cost price is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Cost price must be a positive number"
    ),
  sellingPrice: z
    .string()
    .min(1, "Selling price is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Selling price must be a positive number"
    ),
  discountPrice: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || (!isNaN(Number(val)) && Number(val) >= 0),
      "Discount price must be a positive number"
    ),

  initialStock: z
    .string()
    .min(1, "Initial stock is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Initial stock must be a non-negative number"
    ),
  lowStockThreshold: z
    .string()
    .min(1, "Low stock threshold is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Low stock threshold must be a non-negative number"
    ),

  weight: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || (!isNaN(Number(val)) && Number(val) > 0),
      "Weight must be a positive number"
    ),
  dimensions: z.string().optional().or(z.literal("")),

  isPerishable: z.boolean(),
  isActive: z.boolean(),
  trackInventory: z.boolean(),
  requiresRefrigeration: z.boolean(),
  isOrganic: z.boolean(),
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
    const newProduct = await Product.create(result.data);
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
): Promise<
  Response<IProduct & { supplier: ISupplier } & { category: ICategory }>
> {
  try {
    await connectToDatabase();
    await Supplier.exists({});
    await Category.exists({});
    const product = await Product.findOne({ _id: id })
      .populate<{ supplier: ISupplier }>("supplier")
      .populate<{ categories: ICategory }>("category");
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
): Promise<
  Response<{
    products: (IProduct & { supplier: ISupplier } & { category: ICategory })[];
    total: number;
    pages: number;
  }>
> {
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
    })
      .populate<{ supplier: ISupplier }>("supplier")
      .populate<{ category: ICategory }>("category")
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Product.countDocuments({
      name: { $regex: options.searchTerm || "", $options: "i" },
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

export async function deleteProduct(id: string): Promise<Response<null>> {
  if (!id) return { success: false, error: "Product ID is required" };
  if (!mongoose.Types.ObjectId.isValid(id))
    return { success: false, error: "Invalid product ID" };
  try {
    await connectToDatabase();
    const data = (await cookies()).get("user");

    if (!data) {
      return { success: false, error: "User not authenticated" };
    }
    const user = JSON.parse(data.value);
    if (user.role !== "admin") {
      return { success: false, error: "Only admins can delete products" };
    }
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      return { success: false, error: "Product not found" };
    }
    revalidatePath("/dashboard/products");
    return { success: true, data: null };
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function findProductsByCategory(
  id: string
): Promise<Response<(IProduct & { supplier: ISupplier })[]>> {
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    return { success: false, error: "User is not authenticated" };
  }
  if (!id) {
    return { success: false, error: "Id is required" };
  }
  if (!isValidObjectId(id)) {
    return { success: false, error: "Invalid mongoose id" };
  }
  await Supplier.exists({});
  const products = await Product.find({ category: id }).populate<{
    supplier: ISupplier;
  }>("supplier");
  console.log(products)
  return { success: true, data: JSON.parse(JSON.stringify(products)) };
}
