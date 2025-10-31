import express from "express";
import { subscribe, cancelSubscription } from "../controllers/subscriptionController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/sub", authMiddleware, subscribe);
router.delete("/cancel", authMiddleware, cancelSubscription);

export default router;
