// src/routes/shipping.js
import express from "express";
import { calculateShipping, getShippingMethods, trackShipment } from "../controllers/shippingController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/methods", getShippingMethods);
router.post("/calculate", authMiddleware, calculateShipping);
router.get("/track/:trackingId", authMiddleware, trackShipment);

export default router;
