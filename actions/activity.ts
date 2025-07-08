"use server";

import Activity, { IActivity } from "@/models/activity";
import { connectToDatabase } from "@/utils/db";
import mongoose from "mongoose";
import { z } from "zod";
import { getUserData, isAuthenticated } from "./auth";
import { IProduct } from "@/models/product";
import { UserType } from "@/models/user";



const activitySchema = z.object({
    product: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid ObjectId",
    }),
    type: z.enum(["sale", "stock_in", "low_stock", "price_change", "stock_out", "refund"]),
    quantity: z.number().min(0).optional(),
    amount: z.number().optional(),
    note: z.string().optional(),
});



export async function createActivity(data: z.infer<typeof activitySchema>) {
    try {
        await connectToDatabase()
        const user = await getUserData();
        if (!user) return { success: false, error: "User not authenticated" };
        const result = activitySchema.safeParse(data);
        if (!result.success) return { success: false, error: result.error.errors[0].message };
        const activity = await Activity.create({
            amount: result.data.amount,
            product: result.data.product,
            type: result.data.type,
            note: result.data.note,
            quantity: result.data.quantity,
            user: user._id
        });
        if (!activity) return { success: false, error: "Failed to create activity" };
        return { success: true, activity: JSON.parse(JSON.stringify(activity)) };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Something went wrong" };
    }

}

export async function getActivity(page: number = 1, limit: number = 10): Promise<{
    success: boolean, data?: {
        activities: (IActivity & { product: IProduct } & { user: UserType })[],
        pagination: {
            currentPage: number,
            totalPages: number,
            totalActivities: number
        }
    }, error?: string
}> {
    try {
        await connectToDatabase()
        const skip = (page - 1) * limit;
        const activities = await Activity.find()
            .sort({ createdAt: -1 }).populate("product").populate("user", "name email")
            .skip(skip)
            .limit(limit)
            .lean()
            .exec();

        const totalActivities = await Activity.countDocuments().exec();
        const totalPages = Math.ceil(totalActivities / limit);

        return {
            success: true,
            data: {
                activities: JSON.parse(JSON.stringify(activities)),
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalActivities,
                },
            },
        };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Something went wrong" };
    }
}

export async function getActivitiesStats() {
    try {
        const stats = await Activity.aggregate([
            {
                $group: {
                    _id: null,
                    totalActivities: { $sum: 1 },
                    todayActivities: {
                        $sum: {
                            $cond: [
                                { $gte: ["$createdAt", new Date(new Date().setHours(0, 0, 0, 0))] },
                                1,
                                0
                            ]
                        }
                    },
                    salesActivities: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "sale"] }, 1, 0]
                        }
                    },
                    stockActivities: {
                        $sum: {
                            $cond: [{ $in: ["$type", ["stock_in", "sale"]] }, 1, 0]
                        }
                    }
                }
            }
        ]);
        if (!stats || stats.length === 0) {
            return { success: true, data: { totalActivities: 0, todayActivities: 0, salesActivities: 0, stockActivities: 0 } };
        }
        console.log(stats)
        const [activityStats] = stats;
        return {
            success: true,
            data: {
                totalActivities: activityStats.totalActivities || 0,
                todayActivities: activityStats.todayActivities || 0,
                salesActivities: activityStats.salesActivities || 0,
                stockActivities: activityStats.stockActivities || 0
            }
        };

    }
    catch (error) {
        return {
            success: false, error: error instanceof Error ? error.message : "Something went wrong"
        }
    }
}