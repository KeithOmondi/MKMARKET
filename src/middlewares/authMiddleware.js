// src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import { AppError } from "../utils/errorHandler.js";

/**
 * Middleware: Verifies JWT and attaches user payload to request.
 */
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Not authorized, token missing", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains { id, role, ... }
    next();
  } catch (err) {
    next(new AppError("Invalid or expired token", 403));
  }
};
