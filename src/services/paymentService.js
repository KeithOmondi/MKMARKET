// src/services/paymentService.js
import { Payment } from "../models/Payment.js";
import { paymentGateway } from "../config/payment.js";
import logger from "../utils/logger.js";

/**
 * Initiate a payment via the gateway (M-Pesa)
 */
export const initiate = async (paymentData) => {
  const result = await paymentGateway.charge(paymentData);
  logger.info(`💳 Payment initiated for ${paymentData.accountReference || "unknown reference"}`);
  return result;
};

/**
 * Confirm payment (after callback or polling)
 */
export const confirm = async (confirmationData) => {
  // Example: Update payment status in DB
  const payment = await Payment.findOneAndUpdate(
    { transactionId: confirmationData.transactionId },
    { status: confirmationData.status },
    { new: true }
  );
  logger.info(`✅ Payment confirmed for transaction ${confirmationData.transactionId}`);
  return payment;
};
