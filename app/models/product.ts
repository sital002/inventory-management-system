import { ISupplier } from "./supplier";
import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  supplier: ISupplier;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
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
