"use server";
import Category, { ICategory } from "@/models/category";
import Product, { IProduct } from "@/models/product";
import Supplier, { ISupplier } from "@/models/supplier";
import { connectToDatabase } from "@/utils/db";
import mongoose, { isValidObjectId } from "mongoose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import { isAuthenticated } from "./auth";
import { productSchema } from "@/schema/product";
import Order from "@/models/order";
import ReOrder from "@/models/reorder";
import Activity from "@/models/activity";
export type Response<T> =
  | { success: true; data: T }
  | { success: false; error: string };



export async function addNewProduct(
  product: z.infer<typeof productSchema>
): Promise<Response<IProduct>> {
  try {
    await connectToDatabase();
    const result = productSchema.safeParse(product);
    if (!result.success) {
      throw new Error(result.error.errors[0].message.toString());
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
      sku: result.data.sku,
      barcode: result.data.barcode || "",
      category: result.data.categoryId,
      supplier: result.data.supplierId,
      brand: result.data.brand || "",
      unit: result.data.unit,
      costPrice: parseFloat(result.data.costPrice),
      sellingPrice: parseFloat(result.data.sellingPrice),
      discountPrice: result.data.discountPrice
        ? parseFloat(result.data.discountPrice)
        : 0,
      initialStock: parseFloat(result.data.initialStock),
      lowStockThreshold: parseFloat(result.data.lowStockThreshold),
      weight: result.data.weight ? parseFloat(result.data.weight) : 0,
      dimensions: result.data.dimensions,
      currentStock: parseFloat(result.data.initialStock),
      isActive: result.data.isActive || true,
      isOrganic: result.data.isOrganic || false,
      isPerishable: result.data.isPerishable || false,
      requiresRefrigeration: result.data.requiresRefrigeration || false,
      trackInventory: result.data.trackInventory || true,
    });
    if (!newProduct) {
      throw new Error("Failed to create product");
    }
    revalidatePath("/dashboard/products");
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

export async function updateProduct(
  id: string,
  product: z.infer<typeof productSchema>
): Promise<Response<IProduct>> {
  try {
    await connectToDatabase();
    const result = productSchema.safeParse(product);
    if (!result.success) {
      throw new Error(result.error.errors[0].message.toString());
    }
    const data = (await cookies()).get("user");

    if (!data) {
      throw new Error("User not authenticated");
    }
    const user = JSON.parse(data.value);
    if (user.role !== "admin") {
      throw new Error("Only admins can add new products");
    }
    const productExists = await Product.findById(id);
    if (!productExists) {
      return { success: false, error: "Product Not found" }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, {
      name: result.data.name,
      description: result.data.description,
      sku: result.data.sku,
      barcode: result.data.barcode || "",
      category: result.data.categoryId,
      supplier: result.data.supplierId,
      brand: result.data.brand || "",
      unit: result.data.unit,
      costPrice: parseFloat(result.data.costPrice),
      sellingPrice: parseFloat(result.data.sellingPrice),
      discountPrice: result.data.discountPrice
        ? parseFloat(result.data.discountPrice)
        : 0,
      initialStock: parseFloat(result.data.initialStock),
      lowStockThreshold: parseFloat(result.data.lowStockThreshold),
      weight: result.data.weight ? parseFloat(result.data.weight) : 0,
      dimensions: result.data.dimensions,
      currentStock: parseFloat(result.data.initialStock),
      isActive: result.data.isActive || true,
      isOrganic: result.data.isOrganic || false,
      isPerishable: result.data.isPerishable || false,
      requiresRefrigeration: result.data.requiresRefrigeration || false,
      trackInventory: result.data.trackInventory || true,
    });
    if (!updateProduct) {
      throw new Error("Failed to create product");
    }
    revalidatePath("/dashboard/products");
    return { success: true, data: JSON.parse(JSON.stringify(updatedProduct)) };
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
    if (!mongoose.isValidObjectId(id)) return { success: false, error: "Invalid Product Id" }
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
      category: options.category ? options.category : { $exists: true },
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
    await Activity.deleteMany({ product: id });
    await Order.deleteMany({ "products.product": id });
    await ReOrder.deleteMany({ productId: id })
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
  await connectToDatabase()
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


  return { success: true, data: JSON.parse(JSON.stringify(products)) };
}

export async function getLowStockProducts(): Promise<(IProduct & { supplier: ISupplier } & { category: ICategory })[]> {
  try {
    await connectToDatabase();
    const lowStockProducts = await Product.find({
      $or: [
        { currentStock: 0 },
        {
          $expr: {
            $and: [
              { $gt: ["$currentStock", 0] },
              { $lte: ["$currentStock", "$lowStockThreshold"] }
            ]
          }
        }
      ]
    })
      .populate<{ category: ICategory }>("category")
      .populate("supplier").sort({ currentStock: 1 })
      .lean();
    console.log(lowStockProducts)
    return JSON.parse(JSON.stringify(lowStockProducts));
  } catch (error) {
    console.log("Error fetching low stock products:", error);
    return []
  }
}