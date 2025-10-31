// src/config/env.js
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,

  // --- Database & Security ---
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  REDIS_URL: process.env.REDIS_URL,

  // --- URLs & Domains ---
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173", // frontend (React, Next.js)
  BASE_URL:
    process.env.BASE_URL ||
    "http://localhost:8000", // backend base URL, useful for callbacks, webhooks

  // --- Cloudinary Config ---
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.CLOUD_API_KEY,
    API_SECRET: process.env.CLOUD_API_SECRET,
  },

  // --- Sendy Config ---
  SENDY: {
    API_KEY: process.env.SENDY_API_KEY,
    BASE_URL: process.env.SENDY_BASE_URL,
  },

  // --- Firebase Config ---
  FIREBASE: {
    PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },

  // --- M-Pesa Config ---
  MPESA: {
    BASE_URL: process.env.MPESA_BASE_URL || "https://sandbox.safaricom.co.ke",
    CONSUMER_KEY: process.env.MPESA_CONSUMER_KEY,
    CONSUMER_SECRET: process.env.MPESA_CONSUMER_SECRET,
    SHORTCODE: process.env.MPESA_SHORTCODE,
    PASSKEY: process.env.MPESA_PASSKEY,
    CALLBACK_URL: process.env.MPESA_CALLBACK_URL,
  },

  // --- AI / Others ---
  AI_API_KEY: process.env.AI_API_KEY,
};
