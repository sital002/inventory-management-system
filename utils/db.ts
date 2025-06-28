import mongoose from "mongoose";


let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) return;

  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/inventory");

  isConnected = true;
};



