import { AppError } from "../utils/errorHandler.js";

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return next(new AppError("Access denied: insufficient permissions", 403));
    }
    next();
  };
};

// alias for compatibility
export const roleMiddleware = authorizeRoles;
