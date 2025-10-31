import express from "express";
import { getRewards, redeemReward } from "../controllers/rewardController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get", authMiddleware, getRewards);
router.post("/redeem", authMiddleware, redeemReward);

export default router;
