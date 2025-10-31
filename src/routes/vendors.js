import express from "express";
import { registerVendor, getVendorProducts, getVendorOrders } from "../controllers/vendorController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", authMiddleware, registerVendor);
router.get("/products", authMiddleware, getVendorProducts);
router.get("/orders", authMiddleware, getVendorOrders);

export default router;
