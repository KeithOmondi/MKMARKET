import express from "express";
import { createReview, getReviews } from "../controllers/reviewController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get/:productId", getReviews);
router.post("/create", authMiddleware, createReview);

export default router;
