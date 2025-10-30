// src/config/db.js
import mongoose from "mongoose";
import { ENV } from "./env.js";
import logger from "../utils/logger.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);
    logger.info(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    logger.error(`❌ Database connection failed: ${err.message}`);
    process.exit(1);
  }
};
