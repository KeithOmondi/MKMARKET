import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import Redis from "ioredis";
import { ENV } from "../config/env.js";

/**
 * 🔹 Redis Client Setup (used only in production)
 * Ensures rate limits are shared across multiple servers
 */
let store = undefined;
if (ENV.NODE_ENV === "production" && ENV.REDIS_URL) {
  const redisClient = new Redis(ENV.REDIS_URL);
  store = new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  });
}

/**
 * 🧱 Global API Limiter
 * Protects the entire API from overuse (like scraping or flooding)
 */
export const apiLimiter = rateLimit({
  store,
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // 200 requests per 15 mins per IP
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * 🔐 Authentication Limiter
 * Prevents brute-force attacks on login and registration
 */
export const authLimiter = rateLimit({
  store,
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // only 5 login/register attempts
  message: "Too many login attempts. Please try again after 15 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * 💳 Checkout Limiter (optional)
 * Prevents payment abuse or spam checkout requests
 */
export const checkoutLimiter = rateLimit({
  store,
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // max 10 checkout attempts
  message: "Too many checkout attempts. Please try again in a few minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * 🧪 Note:
 * - During local development, rate limiting is memory-based.
 * - In production, it automatically uses Redis for global consistency.
 */
