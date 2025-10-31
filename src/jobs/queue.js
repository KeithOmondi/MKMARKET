// src/jobs/queue.js
import pkg from "bullmq";
const { Queue, QueueScheduler } = pkg;
import { ENV } from "../config/env.js";
import { redisClient } from "../config/redis.js";
import logger from "../utils/logger.js";

// Use Redis connection from ENV
const connection = { url: ENV.REDIS_URL || "redis://localhost:6379" };

// ✅ Define main queues
export const queues = {
  email: new Queue("emailQueue", { connection }),
  order: new Queue("orderQueue", { connection }),
  analytics: new Queue("analyticsQueue", { connection }),
  push: new Queue("pushQueue", { connection }),
  recommendation: new Queue("recommendationQueue", { connection }),
  subscription: new Queue("subscriptionQueue", { connection }),
  dynamicPricing: new Queue("dynamicPricingQueue", { connection }),
};

// ✅ Initialize queue schedulers (for delayed/repeated jobs)
Object.keys(queues).forEach((key) => {
  new QueueScheduler(`${key}Queue`, { connection });
});

logger.info("✅ All BullMQ queues initialized successfully");

// ✅ Helper to add a job easily
export const addJob = async (queueName, data, opts = {}) => {
  if (!queues[queueName]) throw new Error(`Queue '${queueName}' not found`);
  await queues[queueName].add(queueName, data, opts);
  logger.info(`📦 Added job to ${queueName} queue`);
};
