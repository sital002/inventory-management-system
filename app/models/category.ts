import { Schema, model, Document, models } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
  color:
    | "Gray"
    | "Green"
    | "Blue"
    | "Red"
    | "Yellow"
    | "Purple"
    | "Orange"
    | "Pink"
    | "Cyan";
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
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
        "Gray",
        "Green",
        "Blue",
        "Red",
        "Yellow",
        "Purple",
        "Orange",
        "Pink",
        "Cyan",
      ],
      default: "Green",
    },
  },
  {
    timestamps: true,
  }
);

const Category =
  models.Category || model<ICategory>("Category", categorySchema);

export default Category;
