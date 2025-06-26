import mongoose, { Model, models, ObjectId } from "mongoose";
interface IProductActivity {
    id: string;
    product: ObjectId;
    type: "Sale" | "Restock" | "Return";
    quantity: number;
    note: string;
    createdAt: Date;
    updatedAt: Date;
}

const productActivitySchema = new mongoose.Schema<IProductActivity>({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    type: {
        type: String,
        enum: ["Sale", "Restock", "Return"],
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    note: {
        type: String,
        default: "",
    },

}, { timestamps: true });

const ProductActivity: Model<IProductActivity> = models.ProductActivity || mongoose.model("ProductActivity", productActivitySchema);
export default ProductActivity;
