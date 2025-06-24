import { model, models, Schema, Types, Model } from "mongoose";

interface IOrder {
  _id: Types.ObjectId;
  customerName: string;
  customerPhone?: string;
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  paymentMethod: "cash" | "card" | "online";
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    customerName: {
      type: String,
      trim: true,
      required: false,
    },
    customerPhone: {
      type: String,
      trim: true,
      required: false,
    },
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
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
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

const Order: Model<IOrder> =
  models.Order || model<IOrder>("Order", orderSchema);

export default Order;
