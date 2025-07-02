"use server"
import Product from "@/models/product";
import ReOrder from "@/models/reorder";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Response<T> = {
    success: true,
    data: T
} | {
    success: false,
    error: string
}

const reorderSchema = z.object({
    items: z.array(z.object({
        productId: z.string(),
        quantity: z.number().int().positive()
    }))
})
export async function reStockOrder(data: z.infer<typeof reorderSchema>): Promise<Response<null>> {
    const result = reorderSchema.safeParse(data);
    if (!result.success) return { success: false, error: result.error.message }
    const { items } = result.data;
    const productIds = items.map(item => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    if (products.length !== items.length) {
        return { success: false, error: "Some products not found" };
    }
    for (const product of products) {
        const item = items.find(i => i.productId === product._id.toString());
        if (item) {
            product.currentStock += item.quantity;
            await ReOrder.create({
                productId: product._id,
                quantity: item.quantity,
                subtotal: item.quantity * product.costPrice,
            })
            await product.save();
        }
    }

    revalidatePath("/dashboard/rproducts");
    return { success: true, data: null };

}