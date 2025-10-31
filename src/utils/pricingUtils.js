// src/utils/pricingUtils.js

/**
 * Calculates dynamic price based on demand and seasonality
 */
export const calculateDynamicPrice = (product) => {
  const { basePrice, demandLevel = "normal", season = "normal" } = product;

  let multiplier = 1;

  // Demand-based adjustments
  if (demandLevel === "high") multiplier += 0.15;
  if (demandLevel === "low") multiplier -= 0.1;

  // Seasonal adjustments
  if (season === "holiday") multiplier += 0.05;

  const dynamicPrice = Number((basePrice * multiplier).toFixed(2));
  return dynamicPrice;
};

/**
 * Calculates a discounted price given a base price and a discount percentage
 */
export const calculateDiscountedPrice = (price, discountPercent = 0) => {
  return Number((price - (price * discountPercent) / 100).toFixed(2));
};
