import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const MONGO_URI = isProduction
  ? (process.env.MONGO_URI_PROD as string)
  : (process.env.MONGO_URI as string);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;
