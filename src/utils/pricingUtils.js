// src/utils/pricingUtils.js

export const applyDynamicPricingLogic = (basePrice, demandLevel, season = "normal") => {
  let multiplier = 1;

  if (demandLevel === "high") multiplier += 0.15;
  if (demandLevel === "low") multiplier -= 0.1;

  if (season === "holiday") multiplier += 0.05;

  return Number((basePrice * multiplier).toFixed(2));
};

export const calculateDiscountedPrice = (price, discountPercent = 0) => {
  return Number((price - (price * discountPercent) / 100).toFixed(2));
};
