import mongoose from "mongoose";

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/inventory";
  if (!uri) {
    throw new Error("MongoDB connection string is not defined.");
  }

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
}
