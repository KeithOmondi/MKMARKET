import { createClient } from "redis";
import { ENV } from "./env.js";
import logger from "../utils/logger.js";

export const redisClient = createClient({
  url: ENV.REDIS_URL,
});

redisClient.on("connect", () => {
  logger.info("✅ Redis connected successfully");
});

redisClient.on("error", (err) => {
  logger.error(`❌ Redis error: ${err.message}`);
});

await redisClient.connect().catch((err) => {
  logger.error(`❌ Failed to connect to Redis: ${err.message}`);
});
