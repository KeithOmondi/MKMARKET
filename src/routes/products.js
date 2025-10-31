import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/all", getAllProducts);
router.get("/get/:id", getProduct);
router.post("/create", authMiddleware, roleMiddleware("vendor", "admin"), createProduct);
router.put("/update/:id", authMiddleware, roleMiddleware("vendor", "admin"), updateProduct);
router.delete("/delete/:id", authMiddleware, roleMiddleware("vendor", "admin"), deleteProduct);

export default router;
