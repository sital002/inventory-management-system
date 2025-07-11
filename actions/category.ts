"use server";

import Category, { ICategory } from "@/models/category";
import { connectToDatabase } from "@/utils/db";
import { z } from "zod";
import { getUserData, isAuthenticated } from "./auth";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import Product from "@/models/product";

const categorySchma = z.object({
  name: z.string({ message: "Name is missing" }).min(1, "Name is required"),
  description: z.string().optional(),
  color: z.enum(
    [
      "Green",
      "Blue",
      "Red",
      "Yellow",
      "Purple",
      "Orange",
      "Pink",
      "Cyan",
      "Gray",
    ],
    {
      message:
        "Color must be one of Green, Blue, Red, Yellow, Purple, Orange, Pink, Cyan, or Gray",
    }
  ),
});

type Response<T> =
  | {
    success: true;
    data: T;
  }
  | {
    success: false;
    error: string;
  };

export async function createCategory(
  category: z.infer<typeof categorySchma>
): Promise<Response<ICategory>> {
  const result = categorySchma.safeParse(category);
  if (!result.success)
    return {
      success: false,
      error: result.error.errors.map((e) => e.message).join(", "),
    };
  try {
    await connectToDatabase();
    const isLoggedIn = await isAuthenticated();
    if (!isLoggedIn)
      return {
        success: false,
        error: "User not authenticated",
      };
    const newCategory = await Category.create({
      name: category.name,
      description: category.description || "",
      color: category.color,
    });
    revalidatePath("/dashboard/categories");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newCategory)),
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Failed to create category",
    };
  }
}

export async function getCategory(id: string): Promise<Response<ICategory>> {
  try {
    await connectToDatabase();
    const isLoggedIn = await isAuthenticated();
    if (!isLoggedIn)
      return {
        success: false,
        error: "User not authenticated",
      };
    const category = await Category.findById(id).populate("products");
    if (!category)
      return {
        success: false,
        error: "Category not found",
      };
    return {
      success: true,
      data: JSON.parse(JSON.stringify(category)),
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Failed to fetch category",
    };
  }
}


export async function getCategories() {
  try {

    const isLoggedIn = await isAuthenticated();
    if (!isLoggedIn) return [];
    const categories = await Category.find().lean();
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.log("Error fetching categories:", error);
    return []
  }
}


export async function deleteCategory(id: string) {
  if (!id) {
    return {
      success: false,
      error: "Category ID is required",
    };
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return {
      success: false,
      error: "Invalid category ID",
    };
  }
  try {
    await connectToDatabase();
    const user = await getUserData();
    if (!user) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    if (user.role !== "admin") {
      return {
        success: false,
        error: "You do not have permission to delete categories",
      }
    }
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return {
        success: false,
        error: "Category not found",
      };
    }
    await Product.deleteMany({ category: id });
    revalidatePath("/dashboard/categories");
    return {
      success: true,
      data: "Category deleted successfully",
    }

  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Failed to delete category",
    };
  }

}
export async function getAllCategories(): Promise<
  Response<
    {
      _id: string;
      name: string;
      description: string;
      color: string;
      itemCount: number;
      lowStockItems: number;
      totalValue: number;
    }[]
  >
> {
  try {
    await connectToDatabase();
    const isLoggedIn = await isAuthenticated();
    if (!isLoggedIn)
      return {
        success: false,
        error: "User not authenticated",
      };
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "products",
        },
      },
      {
        $addFields: {
          itemCount: { $size: "$products" },
          lowStockItems: {
            $size: {
              $filter: {
                input: "$products",
                as: "product",
                cond: {
                  $lte: ["$$product.currentStock", "$$product.lowStockThreshold"],
                },
              },
            },
          },
          totalValue: {
            $sum: {
              $map: {
                input: "$products",
                as: "product",
                in: { $multiply: ["$$product.sellingPrice", "$$product.currentStock"] },
              },
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          color: 1,
          itemCount: 1,
          lowStockItems: 1,
          totalValue: 1,
        },
      },
    ]);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(categories)),
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Failed to fetch categories",
    };
  }
}

export async function getStats(): Promise<
  Response<{
    totalCategories: number;
    totalItems: number;
    lowStockItems: number;
    outofStock: number;
    totalValue: number;
  }>
> {
  try {
    await connectToDatabase();
    const isLoggedIn = await isAuthenticated();
    if (!isLoggedIn)
      return {
        success: false,
        error: "User not authenticated",
      };

    const stats = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "products",
        },
      },
      {
        $addFields: {
          lowStockItems: {
            $size: {
              $filter: {
                input: "$products",
                as: "product",
                cond: {
                  $and: [
                    { $lte: ["$$product.currentStock", "$$product.lowStockThreshold"] },
                    { $gt: ["$$product.currentStock", 0] },
                  ],
                },
              },
            },
          },
          outofStock: {
            $size: {
              $filter: {
                input: "$products",
                as: "product",
                cond: { $eq: ["$$product.currentStock", 0] },
              },
            },
          },
          totalValue: {
            $sum: {
              $map: {
                input: "$products",
                as: "product",
                in: { $multiply: ["$$product.sellingPrice", "$$product.currentStock"] },
              },
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalCategories: { $sum: 1 },
          totalItems: { $sum: { $size: "$products" } },
          lowStockItems: { $sum: "$lowStockItems" },
          outofStock: { $sum: "$outofStock" },
          totalValue: { $sum: "$totalValue" },
        },
      },
      {
        $project: {
          _id: 0,
          totalCategories: 1,
          totalItems: 1,
          lowStockItems: 1,
          outofStock: 1,
          totalValue: 1,
        },
      },
    ]);

    return {
      success: true,
      data: stats[0] || {
        totalCategories: 0,
        totalItems: 0,
        lowStockItems: 0,
        totalValue: 0,
        outofStock: 0,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Failed to fetch category stats",
    };
  }
}

export async function getSingleCategoryStats(id: string): Promise<
  Response<{
    name: string;
    description: string;
    color: string;
    itemCount: number;
    lowStock: number;
    inStock: number;
    outofStock: number;
    totalValue: number;
  }>
> {
  try {
    await connectToDatabase();
    const isLoggedIn = await isAuthenticated();
    if (!isLoggedIn)
      return {
        success: false,
        error: "User not authenticated",
      };
    const stats = await Category.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "products",
        },
      },
      {
        $addFields: {
          itemCount: { $size: "$products" },
          lowStock: {
            $size: {
              $filter: {
                input: "$products",
                as: "product",
                cond: {
                  $lte: ["$$product.currentStock", "$$product.lowStockThreshold"],
                },
              },
            },
          },
          inStock: {
            $size: {
              $filter: {
                input: "$products",
                as: "product",
                cond: { $gt: ["$$product.currentStock", "$$product.lowStockThreshold"] },
              },
            },
          },
          outofStock: {
            $size: {
              $filter: {
                input: "$products",
                as: "product",
                cond: { $eq: ["$$product.currentStock", 0] },
              },
            },
          },
          totalValue: {
            $sum: {
              $map: {
                input: "$products",
                as: "product",
                in: { $multiply: ["$$product.sellingPrice", "$$product.currentStock"] },
              },
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          color: 1,
          itemCount: 1,
          lowStock: 1,
          inStock: 1,
          outofStock: 1,
          totalValue: 1,
        },
      },
    ]);

    return {
      success: true,
      data: stats[0] || {
        lowStock: 0,
        inStock: 0,
        outofStock: 0,
        itemCount: 0,
        totalValue: 0,
        name: "",
        description: "",
        color: "",
      },
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Failed to fetch category stats",
    };
  }
}
