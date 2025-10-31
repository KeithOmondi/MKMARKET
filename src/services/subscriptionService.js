// src/services/subscriptionService.js
import { Subscription } from "../models/Subscription.js";
import * as paymentService from "./paymentService.js";
import logger from "../utils/logger.js";

export const processSubscriptionRenewal = async (userId) => {
  const sub = await Subscription.findOne({ userId, active: true });
  if (!sub) {
    logger.warn(`⚠️ No active subscription found for user ${userId}`);
    return null;
  }

  // Reuse the payment flow (initiate + confirm)
  const paymentData = {
    amount: sub.amount,
    method: sub.paymentMethod,
    description: `Subscription renewal for ${sub.plan}`,
  };

  const initiated = await paymentService.initiate(paymentData);
  const confirmed = await paymentService.confirm(initiated);

  logger.info(`🔄 Subscription renewed for user ${userId}`);
  return confirmed;
};
