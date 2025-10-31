// src/jobs/emailJob.js
import { Worker } from "bullmq";
import { ENV } from "../config/env.js";
import logger from "../utils/logger.js";
import { sendEmail } from "../services/emailService.js";

const connection = { url: ENV.REDIS_URL };

export const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    const { to, subject, template, data } = job.data;
    await sendEmail(to, subject, template, data);
  },
  { connection }
);

emailWorker.on("completed", (job) => logger.info(`📧 Email sent successfully: ${job.id}`));
emailWorker.on("failed", (job, err) => logger.error(`❌ Email job failed: ${job.id}, ${err.message}`));
