// src/services/refundService.js
import { Payment } from "../models/Payment.js";
import { paymentGateway } from "../config/payment.js";

export const initiateRefund = async (orderId) => {
  const payment = await Payment.findOne({ orderId });
  const result = await paymentGateway.refund(payment.transactionId);
  payment.status = "refunded";
  await payment.save();
  return result;
};
