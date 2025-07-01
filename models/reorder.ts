import mongoose, { Model, ObjectId, Schema } from "mongoose";

interface IReOrder {
    _id: ObjectId;
    productId: ObjectId;
    quantity: number;
    subtotal: number;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}


const reOrderSchema = new Schema<IReOrder>({
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    subtotal: {
        type: Number,
        required: true,
        min: 0
    },
    notes: {
        type: String,
        trim: true,
        maxlength: 500
    }
}, {
    timestamps: true
});

const ReOrder: Model<IReOrder> = mongoose.models.ReOrderModel || mongoose.model<IReOrder>("ReOrder", reOrderSchema);
export default ReOrder;