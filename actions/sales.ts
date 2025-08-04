import { connectToDatabase } from "@/utils/db"
import { isAuthenticated } from "./auth";
import Order from "@/models/order";

export async function productSales() {

    try {

        await connectToDatabase();
        const isLoggedIn = await isAuthenticated();
        if (!isLoggedIn) return [];

        const salesData = await Order.aggregate([
            { $unwind: "$products" },
            {
                $group: {
                    _id: "$products.product",
                    unitsSold: { $sum: "$products.quantity" },
                    revenue: { $sum: "$products.subtotal" },
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product",
                },
            },
            { $unwind: "$product" },
            {
                $lookup: {
                    from: "categories",
                    localField: "product.category",
                    foreignField: "_id",
                    as: "category",
                },
            },
            { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
            {
                $addFields: {
                    cost: { $multiply: ["$unitsSold", "$product.costPrice"] },
                    profit: { $subtract: ["$revenue", { $multiply: ["$unitsSold", "$product.costPrice"] }] },
                    profitMargin: {
                        $cond: [
                            { $gt: ["$revenue", 0] },
                            {
                                $multiply: [
                                    {
                                        $divide: [
                                            { $subtract: ["$revenue", { $multiply: ["$unitsSold", "$product.costPrice"] }] },
                                            "$revenue",
                                        ],
                                    },
                                    100,
                                ],
                            },
                            0,
                        ],
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    productName: "$product.name",
                    category: "$category.name",
                    unitsSold: 1,
                    revenue: { $round: ["$revenue", 2] },
                    profit: { $round: ["$profit", 2] },
                    profitMargin: { $round: ["$profitMargin", 1] },
                },
            },
            { $sort: { unitsSold: -1 } },
            { $limit: 10 },
        ]);

        return salesData;


    }
    catch (err) {
        console.log(err)
        return []
    }
}

