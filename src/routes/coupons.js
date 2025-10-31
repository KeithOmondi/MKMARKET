import express from "express";
import { applyCoupon, createCoupon, getAllCoupons } from "../controllers/couponController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", getAllCoupons);
router.post("/apply", authMiddleware, applyCoupon);
router.post("/", authMiddleware, roleMiddleware("admin"), createCoupon);

export default router;
