import { HydratedDocumentFromSchema, Model } from "mongoose";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

export type UserType = HydratedDocumentFromSchema<typeof userSchema>;

const User: Model<UserType> =
  models.User || model<UserType>("User", userSchema);

export default User;
