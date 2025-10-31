import express from "express";
import { getNotifications, markAsRead } from "../controllers/notificationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get", authMiddleware, getNotifications);
router.put("/mark/:id/read", authMiddleware, markAsRead);

export default router;
