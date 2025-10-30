import { AppError } from "../utils/errorHandler.js";
import { applyDynamicPricing } from "../services/pricingService.js";

export const pricingMiddleware = async (req, res, next) => {
  try {
    if (req.body.items && req.body.items.length) {
      req.body.items = await Promise.all(
        req.body.items.map(async (item) => {
          const adjusted = await applyDynamicPricing(item);
          return { ...item, price: adjusted.price };
        })
      );
    }
    next();
  } catch (err) {
    next(new AppError("Pricing middleware failed", 500));
  }
};
