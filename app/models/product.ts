import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface IProduct {
  name: string;
  sku: string;
  barcode?: string;
  category: mongoose.Types.ObjectId;
  supplier: mongoose.Types.ObjectId;
  brand?: string;
  description?: string;
  unit: string;
  costPrice: number;
  sellingPrice: number;
  discountPrice?: number;
  initialStock: number;
  currentStock: number;
  lowStockThreshold: number;
  weight?: number;
  dimensions?: string;
  isPerishable: boolean;
  isActive: boolean;
  trackInventory: boolean;
  requiresRefrigeration: boolean;
  isOrganic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  sku: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  barcode: {
    type: String,
    default: "",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  currentStock: {
    type: Number,
    default: 0,
    min: 0,
  },
  brand: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  unit: {
    type: String,
    required: true,
  },
  costPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  sellingPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  discountPrice: {
    type: Number,
    default: 0,
    min: 0,
  },
  initialStock: {
    type: Number,
    required: true,
    min: 0,
  },
  lowStockThreshold: {
    type: Number,
    required: true,
    min: 0,
  },
  weight: {
    type: Number,
    default: null,
    min: 0,
  },
  dimensions: {
    type: String,
    default: "",
  },
  isPerishable: {
    type: Boolean,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  trackInventory: {
    type: Boolean,
    required: true,
  },
  requiresRefrigeration: {
    type: Boolean,
    required: true,
  },
  isOrganic: {
    type: Boolean,
    required: true,
  },

}, {
  timestamps: true
});

const Product = mongoose.model("Product", productSchema);

export default Product;
