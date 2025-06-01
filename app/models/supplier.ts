import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface ISupplier extends Document {
  name: string;
  email: string;
  phone: string;
}

const SupplierSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
});

const Supplier: Model<ISupplier> =
  models.Supplier || mongoose.model<ISupplier>("Supplier", SupplierSchema);

export default Supplier;
