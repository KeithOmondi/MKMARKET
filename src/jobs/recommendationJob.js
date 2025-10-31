// src/jobs/recommendationJob.js
import { Worker } from "bullmq";
import { ENV } from "../config/env.js";
import logger from "../utils/logger.js";
import { generateRecommendations } from "../services/recommendationService.js";

const connection = { url: ENV.REDIS_URL };

export const recommendationWorker = new Worker(
  "recommendationQueue",
  async (job) => {
    const { userId } = job.data;
    await generateRecommendations(userId);
  },
  { connection }
);

recommendationWorker.on("completed", (job) =>
  logger.info(`🤖 Recommendation job complete: ${job.id}`)
);
recommendationWorker.on("failed", (job, err) =>
  logger.error(`❌ Recommendation job failed: ${job.id}, ${err.message}`)
);
