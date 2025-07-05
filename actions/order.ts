"use server"

import Order, { type IOrder } from "@/models/order";
import { isAuthenticated } from "./auth";
import Product, { IProduct } from "@/models/product";
import { connectToDatabase } from "@/utils/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createActivity } from "./activity";

type Response<T> = {
    success: true;
    data: T
} | {
    success: false;
    error: string;
}


const orderSchema = z.object({
    products: z.array(z.object({
        product: z.string(),
        quantity: z.number().min(1).positive("Quantity must be a positive number"),
        subtotal: z.number().min(1).positive("Subtotal must be a positive number"),
    })),
    totalAmount: z.number().min(1).positive("Total amount must be a positive number"),
    paymentMethod: z.enum(["card", "cash", "online"]),
})


export async function createOrder({
    products,
    totalAmount,
    paymentMethod,
}: z.infer<typeof orderSchema>): Promise<Response<IOrder>> {
    try {
        await connectToDatabase()
        const isLoggedIn = await isAuthenticated();
        if (!isLoggedIn) return { success: false, error: "User not authenticated" }

        const parsedData = orderSchema.safeParse({
            products,
            totalAmount,
            paymentMethod,
        })
        if (!parsedData.success) return { success: false, error: parsedData.error.errors[0].message.toString() }
        const listedProducts = await Product.find(
            {
                _id: { $in: products.map(p => p.product) },
                currentStock: { $gt: 0 }
            });
        if (listedProducts.length !== products.length) return { success: false, error: "Some products are not available" }

        const order = new Order({
            products: parsedData.data.products,
            totalAmount,
            paymentMethod,
            status: "completed"
        });
        listedProducts.forEach(async (product) => {
            const orderProduct = parsedData.data.products.find(p => p.product === product._id.toString());
            if (orderProduct) {
                product.currentStock -= orderProduct.quantity;
                if (product.currentStock < 0) {
                    return { success: false, error: `Insufficient stock for product ${product.name}` }
                }
                await product.save();
                await createActivity({
                    product: product._id.toString(),
                    type: "sale",
                    amount: orderProduct.subtotal,
                    quantity: orderProduct.quantity,
                    note: `Sold ${orderProduct.quantity} ${product.unit} of ${product.name} to customer`,
                })
            }
        }
        )
        const savedOrder = await order.save();
        revalidatePath("/dashboard/pos")
        if (!savedOrder) return { success: false, error: "Error creating order" }
        return { success: true, data: JSON.parse(JSON.stringify(savedOrder)) }

    } catch (error) {
        console.log(error)
        return { success: false, error: error instanceof Error ? error.message : "An unexpected error occurred" }
    }

}


type Options = {
    searchQuery: string;
    status: "completed" | "refunded";
    time: "all" | "1" | "7" | "30"
}
export async function getOrders(
    page: number,
    limit: number,
    options?: Options
): Promise<
    Response<{
        orders: (IOrder & { products: { product: IProduct; quantity: number; subtotal: number }[] })[];
        page: number;
        limit: number;
        total: number;
    }>
> {
    try {
        await connectToDatabase();
        const isLoggedIn = await isAuthenticated();
        if (!isLoggedIn)
            return { success: false, error: "User not authenticated" };

        const query: Record<string, any> = {};
        if (options?.searchQuery) {
            query.$or = [
                { "products.name": { $regex: options.searchQuery, $options: "i" } },
                { paymentMethod: { $regex: options.searchQuery, $options: "i" } },
            ];
        }
        if (options?.status) {
            query.status = options.status;
        }
        if (options?.time && options.time !== "all") {
            const daysAgo = new Date();
            daysAgo.setDate(daysAgo.getDate() - parseInt(options.time));
            query.createdAt = { $gte: daysAgo };
        }

        const orders = await Order.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate({
                path: "products.product",
            });

        const totalOrders = await Order.countDocuments(query);

        return {
            success: true,
            data: {
                orders: JSON.parse(JSON.stringify(orders)),
                total: totalOrders,
                page,
                limit,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error:
                error instanceof Error ? error.message : "An unexpected error occurred",
        };
    }
}