import mongoose, { Schema, models, Model, ObjectId } from "mongoose";

export interface ISupplier {
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode?: string;
  taxId: string;
  website?: string;
  contactPerson: string;
  status: "Active" | "Inactive";
  createdAt: Date;
  updatedAt: Date;
}

const SupplierSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    taxId: { type: String, trim: true },
    website: { type: String, trim: true },
    contactPerson: { type: String, trim: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

const Supplier: Model<ISupplier> =
  models.Supplier || mongoose.model<ISupplier>("Supplier", SupplierSchema);

export default Supplier;
