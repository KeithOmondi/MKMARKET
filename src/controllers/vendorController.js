import asyncWrapper from "../utils/asyncWrapper.js";
import * as vendorService from "../services/vendorService.js";

export const registerVendor = asyncWrapper(async (req, res) => {
  const vendor = await vendorService.register(req.user.id, req.body);
  res.status(201).json({ success: true, data: vendor });
});

export const getVendorProducts = asyncWrapper(async (req, res) => {
  const products = await vendorService.getProducts(req.user.id);
  res.json({ success: true, data: products });
});

export const getVendorOrders = asyncWrapper(async (req, res) => {
  const orders = await vendorService.getOrders(req.user.id);
  res.json({ success: true, data: orders });
});
