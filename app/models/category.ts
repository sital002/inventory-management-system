import mongoose, { Schema, ObjectId, Model } from "mongoose";

export interface ICategory {
  _id: ObjectId;
  name: string;
  description?: string;
  color: string;
  products: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      enum: [
        "Green",
        "Blue",
        "Red",
        "Yellow",
        "Purple",
        "Orange",
        "Pink",
        "Cyan",
        "Gray",
      ],
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Category: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
