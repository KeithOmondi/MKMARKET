// src/jobs/pushJob.js
import { Worker } from "bullmq";
import { ENV } from "../config/env.js";
import logger from "../utils/logger.js";
import { sendPushNotification } from "../services/pushService.js";

const connection = { url: ENV.REDIS_URL };

export const pushWorker = new Worker(
  "pushQueue",
  async (job) => {
    const { userId, title, message } = job.data;
    await sendPushNotification(userId, title, message);
  },
  { connection }
);

pushWorker.on("completed", (job) => logger.info(`🔔 Push sent for job ${job.id}`));
pushWorker.on("failed", (job, err) => logger.error(`❌ Push job failed: ${job.id}, ${err.message}`));
