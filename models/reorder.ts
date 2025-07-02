import mongoose, { Model, ObjectId, Schema } from "mongoose";

interface IReOrder {
    _id: ObjectId;
    productId: ObjectId;
    quantity: number;
    subtotal: number;
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

}, {
    timestamps: true
});

const ReOrder: Model<IReOrder> = mongoose.models.ReOrder || mongoose.model<IReOrder>("ReOrder", reOrderSchema);
export default ReOrder;