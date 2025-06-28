"use server"

import Order, { type IOrder } from "@/models/order";
import { isAuthenticated } from "./auth";
import Product from "@/models/product";
import { connectToDatabase } from "@/utils/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";

type Response<T> = {
    success: true;
    data: T
} | {
    success: false;
    error: string;
}


const orderSchema = z.object({
    products: z.array(z.object({
        productId: z.string(),
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
        const listedProducts = await Product.find({ _id: { $in: products.map(p => p.productId) } });
        if (listedProducts.length !== products.length) return { success: false, error: "Some products are not available" }

        const order = new Order({
            products: parsedData.data.products,
            totalAmount,
            paymentMethod,
            status: "completed"
        });
        listedProducts.forEach(async (product) => {
            const orderProduct = parsedData.data.products.find(p => p.productId === product._id.toString());
            if (orderProduct) {
                product.currentStock -= orderProduct.quantity;
                console.log("Reduced quantity for product:", product.name, "by", orderProduct.quantity);
                if (product.currentStock < 0) {
                    return { success: false, error: `Insufficient stock for product ${product.name}` }
                }
                await product.save();
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