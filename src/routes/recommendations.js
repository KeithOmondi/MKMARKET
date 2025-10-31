import express from "express";
import { getRecommendations } from "../controllers/recommendationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get", authMiddleware, getRecommendations);

export default router;
