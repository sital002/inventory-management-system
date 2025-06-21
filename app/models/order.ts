import { model, models, Schema, Document, Types } from "mongoose";

interface IOrder extends Document {
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
      enum: ["pending", "completed", "cancelled"], // Restrict status to specific values
      default: "pending", // Default status is "pending"
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "online"], // Restrict payment method to specific values
      required: true, // Payment method is required
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Order = models.Order || model<IOrder>("Order", orderSchema);

export default Order;
