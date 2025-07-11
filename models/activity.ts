import mongoose, { Model, models, ObjectId } from "mongoose";
export interface IActivity {
    _id: ObjectId;
    product: mongoose.Types.ObjectId;
    type: "sale" | "stock_in" | "low_stock" | "price_change" | "stock_out" | "refund";
    user: ObjectId;
    quantity?: number;
    amount?: number;
    note: string;
    createdAt: Date;
    updatedAt: Date;
}

const activitySchema = new mongoose.Schema<IActivity>({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    type: {
        type: String,
        enum: ["sale", "stock_in", "low_stock", "price_change", "stock_out", "refund"],
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    amount: {
        type: Number,
        default: 0,
    },
    note: {
        type: String,
        default: "",
    },

}, { timestamps: true });

const Activity: Model<IActivity> = models.Activity || mongoose.model("Activity", activitySchema);
export default Activity;
