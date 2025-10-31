import asyncWrapper from "../utils/asyncWrapper.js";
import * as couponService from "../services/couponService.js";

export const applyCoupon = asyncWrapper(async (req, res) => {
  const result = await couponService.apply(req.user.id, req.body.code);
  res.json({ success: true, data: result });
});

export const createCoupon = asyncWrapper(async (req, res) => {
  const coupon = await couponService.create(req.body);
  res.status(201).json({ success: true, data: coupon });
});

export const getAllCoupons = asyncWrapper(async (req, res) => {
  const coupons = await couponService.getAll();
  res.json({ success: true, data: coupons });
});
