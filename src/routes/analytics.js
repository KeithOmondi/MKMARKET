import express from "express";
import { getSalesAnalytics, getTrafficAnalytics } from "../controllers/analyticsController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/sales", authMiddleware, roleMiddleware("admin"), getSalesAnalytics);
router.get("/traffic", authMiddleware, roleMiddleware("admin"), getTrafficAnalytics);

export default router;
