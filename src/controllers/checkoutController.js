// src/controllers/checkoutController.js
import * as checkoutService from "../services/checkoutService.js";
import asyncWrapper from "../utils/asyncWrapper.js";

/**
 * Step 1: Initiate Checkout
 * - Calculates cart total, taxes, delivery, etc.
 * - Returns a summary before user confirms payment.
 */
export const initiateCheckout = asyncWrapper(async (req, res) => {
  const summary = await checkoutService.calculateSummary(req.user.id);
  res.status(200).json({
    success: true,
    message: "Checkout initiated successfully",
    data: summary,
  });
});

/**
 * Step 2: Confirm Checkout
 * - Processes payment (MPESA)
 * - Finalizes order creation
 */
export const confirmCheckout = asyncWrapper(async (req, res) => {
  const order = await checkoutService.finalizeOrder(req.user.id, req.body);
  res.status(201).json({
    success: true,
    message: "Checkout confirmed and order placed successfully",
    data: order,
  });
});
