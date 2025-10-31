import express from "express";
import { getDynamicPrice, updatePricingModel } from "../controllers/pricingController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/get/:productId", getDynamicPrice);
router.put("/update", authMiddleware, roleMiddleware("admin"), updatePricingModel);

export default router;
