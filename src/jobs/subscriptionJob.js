// src/jobs/subscriptionJob.js
import { Worker } from "bullmq";
import { ENV } from "../config/env.js";
import logger from "../utils/logger.js";
import { processSubscriptionRenewal } from "../services/subscriptionService.js";

const connection = { url: ENV.REDIS_URL };

export const subscriptionWorker = new Worker(
  "subscriptionQueue",
  async (job) => {
    const { userId } = job.data;
    await processSubscriptionRenewal(userId);
  },
  { connection }
);

subscriptionWorker.on("completed", (job) =>
  logger.info(`💸 Subscription renewed for job: ${job.id}`)
);
subscriptionWorker.on("failed", (job, err) =>
  logger.error(`❌ Subscription job failed: ${job.id}, ${err.message}`)
);
