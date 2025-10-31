import express from "express";
import { createOrder, getUserOrders, getOrderById } from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getUserOrders);
router.get("/:id", authMiddleware, getOrderById);

export default router;
