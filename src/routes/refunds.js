import express from "express";
import { requestRefund, getRefunds } from "../controllers/refundController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/request", authMiddleware, requestRefund);
router.get("/get", authMiddleware, getRefunds);

export default router;
