// src/jobs/analyticsJob.js
import { Worker } from "bullmq";
import { ENV } from "../config/env.js";
import logger from "../utils/logger.js";
import { updateAnalytics } from "../services/analyticsService.js";

const connection = { url: ENV.REDIS_URL };

export const analyticsWorker = new Worker(
  "analyticsQueue",
  async (job) => {
    logger.info("📈 Running analytics job...");
    await updateAnalytics();
  },
  { connection }
);

analyticsWorker.on("completed", () => logger.info("✅ Analytics job done"));
analyticsWorker.on("failed", (job, err) => logger.error(`❌ Analytics job failed: ${job.id}, ${err.message}`));
