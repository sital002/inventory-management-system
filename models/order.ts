import mongoose from "mongoose";
import { Schema, Types, Model } from "mongoose";

export interface IOrder {
  _id: Types.ObjectId;
  products: {
    product: Types.ObjectId;
    quantity: number;
    subtotal: number;
  }[];
  totalAmount: number;
  status: "returned" | "completed";
  reason?: string;
  paymentMethod: "cash" | "card" | "online";
  createdAt: Date;
  refundReason?: string;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        subtotal: {
          type: Number,
          required: true,
          min: 1,
        }
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    reason: {
      type: String,
    },
    refundReason: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ["returned", "completed"],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "online"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Order: Model<IOrder> = mongoose.models.Order
  ? mongoose.model<IOrder>("Order")
  : mongoose.model<IOrder>("Order", orderSchema);



export default Order;
