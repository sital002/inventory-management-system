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
import { predictNextDayDemand } from "@/utils/predict-next-demand";
import { calculateUnitsForTodayTarget } from "@/utils/target";
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
    // if (user.role !== "admin") {
    //   throw new Error("Only admins can add new products");
    // }
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
      return { success: false, error: "Product Not found" };
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
      throw new Error("Failed to update product");
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
    if (!mongoose.isValidObjectId(id))
      return { success: false, error: "Invalid Product Id" };
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
    await deleteAllProductData(id)
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
  await connectToDatabase();
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

export async function getLowStockProducts(): Promise<
  (IProduct & { supplier: ISupplier } & { category: ICategory })[]
> {
  try {
    await connectToDatabase();
    const lowStockProducts = await Product.find({
      $or: [
        { currentStock: 0 },
        {
          $expr: {
            $and: [
              { $gt: ["$currentStock", 0] },
              { $lte: ["$currentStock", "$lowStockThreshold"] },
            ],
          },
        },
      ],
    })
      .populate<{ category: ICategory }>("category")
      .populate("supplier")
      .sort({ currentStock: 1 })
      .lean();
    // console.log(lowStockProducts);
    return JSON.parse(JSON.stringify(lowStockProducts));
  } catch (error) {
    console.log("Error fetching low stock products:", error);
    return [];
  }
}

export async function deleteAllProductData(products: IProduct[] | string) {
  let productIds: string[];

  if (Array.isArray(products)) {
    productIds = products.map(product => product._id.toString());
  } else {
    productIds = [products];
  }
  await Product.deleteMany({ _id: { $in: productIds } });
  await Activity.deleteMany({ product: { $in: productIds } });
  await Order.updateMany(
    { "products.product": { $in: productIds } },
    { $pull: { products: { product: { $in: productIds } } } }
  );
  await ReOrder.deleteMany({ productId: { $in: productIds } });
  console.log(`Deleted ${productIds.length} product(s) and related data.`);
}

export const updateSellingUnit = async (id: string, unit: number) => {
  try {
    await connectToDatabase();

    const product = await Product.findById(id);
    if (!product) {
      return { success: false, error: "Product not found" };
    }

    const today = new Date();
    const todayStr = today.toDateString();

    let last5DaySelling = product.last5DaySelling || [];

    while (last5DaySelling.length < 5) {
      last5DaySelling.push({ date: new Date(), unit: 0 });
    }

    const lastEntry = last5DaySelling[last5DaySelling.length - 1];
    const lastEntryDateStr = new Date(lastEntry.date).toDateString();

    if (lastEntryDateStr !== todayStr) {
      last5DaySelling.shift();
      last5DaySelling.push({ date: today, unit: 0 });
    }

    last5DaySelling[last5DaySelling.length - 1].unit += unit;

    product.last5DaySelling = last5DaySelling;
    await product.save();

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error("Error updating selling unit:", error);
    return { success: false, error };
  }
};

export const forcastSellingUnit = async () => {
  const product = await Product.find();
  const productSales: Record<string, number[]> = {};
  product.forEach((item) => {
    productSales[item.name] = item.last5DaySelling.map(
      (entry: { unit: number }) => entry.unit
    );
  });
  // console.log("he>>", product);

  return predictNextDayDemand(productSales);
};

export const targetProduct = async (targetRevenue: number) => {
  const product = await Product.find();
  return await calculateUnitsForTodayTarget(product, targetRevenue);
};






function formatTimeSince(date: Date): string {
  const now = new Date().getTime();
  const diff = now - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export async function getSalesStats(productId: string) {
  try {
    const objectId = new mongoose.Types.ObjectId(productId);

    const salesAgg = await Order.aggregate([
      { $match: { status: "completed" } },
      { $unwind: "$products" },
      { $match: { "products.product": objectId } },
      {
        $group: {
          _id: null,
          totalSold: { $sum: "$products.quantity" },
          revenue: { $sum: "$products.subtotal" },
        },
      },
    ]);

    const totalSold = salesAgg[0]?.totalSold || 0;
    const revenue = (salesAgg[0]?.revenue || 0).toFixed(2);

    const past30Days = new Date();
    past30Days.setDate(past30Days.getDate() - 30);

    const dailyAgg = await Order.aggregate([
      {
        $match: {
          status: "completed",
          createdAt: { $gte: past30Days },
        },
      },
      { $unwind: "$products" },
      { $match: { "products.product": objectId } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$products.subtotal" },
        },
      },
    ]);

    const avgDailySales = (
      (dailyAgg[0]?.totalRevenue || 0) / 30
    ).toFixed(1);

    const lastSale = await Order.aggregate([
      {
        $match: {
          status: "completed",
        },
      },
      { $unwind: "$products" },
      { $match: { "products.product": objectId } },
      { $sort: { createdAt: -1 } },
      { $limit: 1 },
      {
        $project: {
          _id: 0,
          createdAt: 1,
        },
      },
    ]);

    const lastSaleTime = lastSale[0]?.createdAt
      ? formatTimeSince(new Date(lastSale[0].createdAt))
      : "N/A";

    return {
      totalSold,
      revenue,
      avgDailySales,
      lastSale: lastSaleTime,
    };
  } catch (error) {
    console.error("Failed to fetch product sales stats:", error);
    throw new Error("Could not retrieve product sales statistics");
  }
}



