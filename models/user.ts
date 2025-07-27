import mongoose, { Model } from "mongoose";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true
  }
);

export type UserType = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: "admin" | "user"
  password: string
}

const User: Model<UserType> =
  models.User || model<UserType>("User", userSchema);

export default User;
