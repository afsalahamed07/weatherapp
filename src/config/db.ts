import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

let cachedDBConnection = globalThis.mongoose;

if (!cachedDBConnection) {
  cachedDBConnection = globalThis.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cachedDBConnection.conn) {
    console.log("Using existing connection");
    return cachedDBConnection.conn;
  }
  if (!cachedDBConnection.promise) {
    console.log("Creating new connection");
    cachedDBConnection.promise = mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
    });
  }
  cachedDBConnection.conn = await cachedDBConnection.promise;
  console.log("Connected to MongoDB");
  return cachedDBConnection.conn;
}

export default connectDB;
