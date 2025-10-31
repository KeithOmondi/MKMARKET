import express from "express";
import { getUserProfile, updateUserProfile, deleteUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = express.Router();

router.get("/get/:id", authMiddleware, getUserProfile);
router.put("/update/:id", authMiddleware, updateUserProfile);
router.delete("/delete/:id", authMiddleware, deleteUser);

export default router;
