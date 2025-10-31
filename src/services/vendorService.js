// src/services/vendorService.js

import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";
import { AppError } from "../utils/errorHandler.js";

/**
 * Register a new vendor
 */
export const registerVendor = async (userId, vendorData) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, "User not found");
  if (user.role === "vendor") throw new AppError(400, "User is already a vendor");

  user.role = "vendor";
  user.vendor = {
    storeName: vendorData.storeName,
    description: vendorData.description,
    logo: vendorData.logo || "",
    verified: false,
  };

  await user.save();
  return user;
};

/**
 * Get vendor profile
 */
export const getVendorProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user || user.role !== "vendor") throw new AppError(404, "Vendor not found");
  return user;
};

/**
 * Get all products for a vendor
 */
export const getVendorProducts = async (vendorId) => {
  const products = await Product.find({ vendor: vendorId });
  return products;
};

/**
 * Create a product for a vendor
 */
export const createVendorProduct = async (vendorId, productData) => {
  const vendor = await User.findById(vendorId);
  if (!vendor || vendor.role !== "vendor") throw new AppError(403, "Not authorized to add products");

  const product = await Product.create({ ...productData, vendor: vendorId });
  return product;
};

/**
 * Update a vendor’s product
 */
export const updateVendorProduct = async (vendorId, productId, updateData) => {
  const product = await Product.findOneAndUpdate(
    { _id: productId, vendor: vendorId },
    { $set: updateData },
    { new: true }
  );

  if (!product) throw new AppError(404, "Product not found or unauthorized");
  return product;
};

/**
 * Delete a vendor’s product
 */
export const deleteVendorProduct = async (vendorId, productId) => {
  const product = await Product.findOneAndDelete({ _id: productId, vendor: vendorId });
  if (!product) throw new AppError(404, "Product not found or unauthorized");
  return product;
};

/**
 * Get all orders for a vendor’s products
 */
export const getVendorOrders = async (vendorId) => {
  const orders = await Order.find({ "items.vendor": vendorId }).populate("items.product");
  return orders;
};

/**
 * Get vendor analytics summary
 */
export const getVendorAnalytics = async (vendorId) => {
  const totalProducts = await Product.countDocuments({ vendor: vendorId });
  const totalOrders = await Order.countDocuments({ "items.vendor": vendorId });
  const totalRevenue = await Order.aggregate([
    { $unwind: "$items" },
    { $match: { "items.vendor": vendorId, status: "completed" } },
    { $group: { _id: null, total: { $sum: "$items.price" } } },
  ]);

  return {
    totalProducts,
    totalOrders,
    totalRevenue: totalRevenue[0]?.total || 0,
  };
};
