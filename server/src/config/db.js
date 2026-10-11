import mongoose from "mongoose";
import { env } from "./env.js";

let isConnected = false;

export const connectDatabase = async () => {
  if (isConnected) return mongoose.connection;

  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });

    isConnected = true;
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
    return conn.connection;
  } catch (error) {
    console.warn(
      `[MongoDB Warning] Could not connect to MongoDB at ${env.MONGODB_URI}: ${error.message}`,
    );
    console.warn(
      "[MongoDB Warning] Server running in disconnected/fallback mode. Ensure MongoDB is active for persistence.",
    );
    return null;
  }
};

export const disconnectDatabase = async () => {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
    console.log("[MongoDB] Disconnected.");
  }
};

export const isDbConnected = () =>
  isConnected && mongoose.connection.readyState === 1;
