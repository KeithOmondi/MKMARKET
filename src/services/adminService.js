// src/services/adminService.js
import {User} from "../models/User.js";
import { AppError } from "../utils/errorHandler.js";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";

/**
 * Get all users
 */
export const getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

/**
 * Get a specific user by ID
 */
export const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw new AppError(404, "User not found");
  return user;
};

/**
 * Update user role
 */
export const updateUserRole = async (userId, role) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true }
  ).select("-password");

  if (!user) throw new AppError(404, "User not found");
  return user;
};

/**
 * Delete user
 */
export const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new AppError(404, "User not found");
  return user;
};

/**
 * Get all vendors
 */
export const getAllVendors = async () => {
  const vendors = await User.find({ role: "vendor" }).select("-password");
  return vendors;
};

/**
 * Verify a vendor (mark as trusted)
 */
export const verifyVendor = async (vendorId) => {
  const vendor = await User.findByIdAndUpdate(
    vendorId,
    { "vendor.verified": true },
    { new: true }
  );

  if (!vendor) throw new AppError(404, "Vendor not found");
  return vendor;
};

/**
 * Get all products
 */
export const getAllProducts = async () => {
  const products = await Product.find().populate("vendor", "name email");
  return products;
};

/**
 * Delete a product
 */
export const deleteProduct = async (productId) => {
  const product = await Product.findByIdAndDelete(productId);
  if (!product) throw new AppError(404, "Product not found");
  return product;
};

/**
 * Get platform analytics (orders, revenue, users)
 */
export const getPlatformAnalytics = async () => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalRevenue = await Order.aggregate([
    { $match: { status: "completed" } },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);

  return {
    totalUsers,
    totalProducts,
    totalOrders,
    totalRevenue: totalRevenue[0]?.total || 0,
  };
};
