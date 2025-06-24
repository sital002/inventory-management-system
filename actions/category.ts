"use server";

import Category, { ICategory } from "@/app/models/category";
import { connectToDatabase } from "@/utils/db";
import { z } from "zod";
import { isAuthenticated } from "./auth";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

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

export async function getAllCategories(): Promise<Response<any[]>> {
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
          foreignField: "categories",
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
                  $lte: ["$$product.stockLevel", "$$product.minStockLevel"],
                },
              },
            },
          },
          totalValue: {
            $sum: {
              $map: {
                input: "$products",
                as: "product",
                in: { $multiply: ["$$product.price", "$$product.stockLevel"] },
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

export async function getCategoryStats(): Promise<
  Response<{
    totalCategories: number;
    totalItems: number;
    lowStockItems: number;
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
          foreignField: "categories",
          as: "products",
        },
      },
      {
        $group: {
          _id: null,
          totalCategories: { $sum: 1 },
          totalItems: { $sum: { $size: "$products" } },
          lowStockItems: {
            $sum: {
              $size: {
                $filter: {
                  input: "$products",
                  as: "product",
                  cond: {
                    $lte: ["$$product.stockLevel", "$$product.minStockLevel"],
                  },
                },
              },
            },
          },
          totalValue: {
            $sum: {
              $map: {
                input: "$products",
                as: "product",
                in: { $multiply: ["$$product.price", "$$product.stockLevel"] },
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalCategories: 1,
          totalItems: 1,
          lowStockItems: 1,
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
          foreignField: "categories",
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
                  $lte: ["$$product.stockLevel", "$$product.minStockLevel"],
                },
              },
            },
          },
          inStock: {
            $size: {
              $filter: {
                input: "$products",
                as: "product",
                cond: { $gt: ["$$product.stockLevel", 0] },
              },
            },
          },
          outofStock: {
            $size: {
              $filter: {
                input: "$products",
                as: "product",
                cond: { $eq: ["$$product.stockLevel", 0] },
              },
            },
          },
          totalValue: {
            $sum: {
              $map: {
                input: "$products",
                as: "product",
                in: { $multiply: ["$$product.price", "$$product.stockLevel"] },
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
