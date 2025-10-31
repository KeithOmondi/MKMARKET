import express from "express";
import { getAllUsers, getAllOrders, manageVendor } from "../controllers/adminController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/users", authMiddleware, roleMiddleware("admin"), getAllUsers);
router.get("/orders", authMiddleware, roleMiddleware("admin"), getAllOrders);
router.put("/vendor/:id", authMiddleware, roleMiddleware("admin"), manageVendor);

export default router;
