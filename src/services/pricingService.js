// src/services/pricingService.js
import { Product } from "../models/Product.js";
import { calculateDynamicPrice } from "../utils/pricingUtils.js";
import logger from "../utils/logger.js";

/**
 * Iterates over all products and updates their dynamic price
 * based on current demand and season data.
 */
export const adjustDynamicPricing = async () => {
  const products = await Product.find();

  for (const product of products) {
    const newPrice = calculateDynamicPrice(product);

    if (newPrice !== product.price) {
      product.price = newPrice;
      await product.save();
      logger.info(`💰 Updated dynamic price for ${product.name}: ${newPrice}`);
    }
  }

  logger.info("✅ Dynamic pricing adjustments completed successfully");
};
