// src/jobs/orderJob.js
import { Worker } from "bullmq";
import { ENV } from "../config/env.js";
import logger from "../utils/logger.js";
import { sendOrderConfirmation } from "../services/emailService.js";

const connection = { url: ENV.REDIS_URL };

export const orderWorker = new Worker(
  "orderQueue",
  async (job) => {
    const { order } = job.data;
    logger.info(`🛒 Processing order #${order._id}`);

    await sendOrderConfirmation(order);
    // Future: analytics, loyalty point updates, etc.
  },
  { connection }
);

orderWorker.on("completed", (job) => logger.info(`✅ Order job completed: ${job.id}`));
orderWorker.on("failed", (job, err) => logger.error(`❌ Order job failed: ${job.id}, ${err.message}`));
