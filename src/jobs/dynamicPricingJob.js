// src/jobs/dynamicPricingJob.js
import { Worker } from "bullmq";
import { ENV } from "../config/env.js";
import logger from "../utils/logger.js";
import { adjustDynamicPricing } from "../services/pricingService.js";

const connection = { url: ENV.REDIS_URL };

export const dynamicPricingWorker = new Worker(
  "dynamicPricingQueue",
  async () => {
    logger.info("💰 Running dynamic pricing job...");
    await adjustDynamicPricing();
  },
  { connection }
);

dynamicPricingWorker.on("completed", () => logger.info("✅ Dynamic pricing job completed"));
dynamicPricingWorker.on("failed", (job, err) => logger.error(`❌ Pricing job failed: ${job.id}, ${err.message}`));
