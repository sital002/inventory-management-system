import { ISupplier } from "./supplier";
import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  sku: string;
  price: number;
  category: string;
  costPrice: number;
  supplier: ISupplier;
  initialStock: number;
  minStock: number;
  status: "Active" | "Low Stock" | "Out of Stock";
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    sku: { type: String, required: true, unique: true, trim: true },
    costPrice: { type: Number, required: true, min: 0 },
    initialStock: { type: Number, required: true, min: 0 },
    minStock: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["Active", "Low Stock", "Out of Stock"],
      default: "Active",
      required: true,
    },

    category: { type: String, required: true },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> =
  models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
