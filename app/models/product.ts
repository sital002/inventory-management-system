import mongoose, { Schema } from "mongoose";

export type IProduct = {
  name: string;
  _id: mongoose.Schema.Types.ObjectId;
  description: string;
  price: number;
  category: string;
  sku: string;
  costPrice: number;
  stockLevel: number;
  minStockLevel: number;
  maxStockLevel: number;
  supplier: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
const ProductSchema: Schema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    sku: { type: String, required: true, unique: true, trim: true },
    costPrice: { type: Number, required: true, min: 0 },
    stockLevel: { type: Number, required: true, min: 0 },
    minStockLevel: { type: Number, required: true, min: 0 },
    maxStockLevel: { type: Number, min: 0, required: true },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
