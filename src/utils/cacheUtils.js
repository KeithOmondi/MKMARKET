// src/utils/cacheUtils.js
import redis from "redis";

let client;
try {
  client = redis.createClient({ url: process.env.REDIS_URL });
  client.connect();
} catch (err) {
  console.warn("⚠️ Redis not connected, fallback to memory cache.");
}

const memoryCache = new Map();

export const getCache = async (key) => {
  if (client) return await client.get(key);
  return memoryCache.get(key);
};

export const setCache = async (key, value, ttl = 300) => {
  if (client) return await client.setEx(key, ttl, JSON.stringify(value));
  memoryCache.set(key, value);
  setTimeout(() => memoryCache.delete(key), ttl * 1000);
};

export const clearCache = async (key) => {
  if (client) return await client.del(key);
  memoryCache.delete(key);
};
