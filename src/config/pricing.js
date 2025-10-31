// src/config/pricing.js

export const PRICING_RULES = {
  HIGH_DEMAND_MULTIPLIER: 1.15,
  LOW_DEMAND_MULTIPLIER: 0.9,
  HOLIDAY_MULTIPLIER: 1.05,
  BASE_MARGIN: 0.2,
};

export const getDynamicPrice = (basePrice, demandLevel, season = "normal") => {
  let multiplier = 1;

  if (demandLevel === "high") multiplier *= PRICING_RULES.HIGH_DEMAND_MULTIPLIER;
  if (demandLevel === "low") multiplier *= PRICING_RULES.LOW_DEMAND_MULTIPLIER;
  if (season === "holiday") multiplier *= PRICING_RULES.HOLIDAY_MULTIPLIER;

  return Number((basePrice * multiplier).toFixed(2));
};
