import redis from "redis";
import { AppError } from "../utils/errorHandler.js";

let client;
try {
  client = redis.createClient({ url: process.env.REDIS_URL });
  client.connect();
} catch (err) {
  console.warn("⚠️ Redis not connected, caching disabled.");
}

export const cacheMiddleware = async (req, res, next) => {
  if (!client) return next();

  const key = req.originalUrl;

  try {
    const cachedData = await client.get(key);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    // Overwrite res.send to store in cache
    const sendResponse = res.json.bind(res);
    res.json = (body) => {
      client.setEx(key, 300, JSON.stringify(body)); // cache for 5 mins
      sendResponse(body);
    };
    next();
  } catch (err) {
    next(new AppError("Cache middleware error", 500));
  }
};
