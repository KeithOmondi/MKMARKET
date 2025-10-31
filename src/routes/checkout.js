// src/routes/checkout.js
import express from "express";
import { initiateCheckout, confirmCheckout } from "../controllers/checkoutController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkoutLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

// Step 1: Get checkout summary
router.post("/initiate", authMiddleware, checkoutLimiter, initiateCheckout);

// Step 2: Confirm checkout and process payment
router.post("/confirm", authMiddleware, confirmCheckout);

export default router;
