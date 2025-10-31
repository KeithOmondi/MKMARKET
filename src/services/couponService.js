// src/services/couponService.js
import { Coupon } from "../models/Coupon.js";

export const validateCoupon = async (code, userId) => {
  const coupon = await Coupon.findOne({ code, isActive: true });
  if (!coupon) throw new Error("Invalid or expired coupon");

  if (coupon.usageLimit && coupon.usedBy.includes(userId))
    throw new Error("Coupon already used");

  return coupon;
};

export const applyCoupon = (total, coupon) => {
  if (coupon.type === "percentage")
    return total - (total * coupon.value) / 100;
  else if (coupon.type === "flat")
    return total - coupon.value;
  return total;
};
