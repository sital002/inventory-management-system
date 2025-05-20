import mongoose from "mongoose";

export function connectToDatabase() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/inventory";
  if (!uri) {
    throw new Error("MongoDB connection string is not defined.");
  }
  return mongoose.connect(uri);
}
