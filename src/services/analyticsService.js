// src/services/analyticsService.js
import { Order } from "../models/Order.js";

export const updateAnalytics = async () => {
  const totalSales = await Order.aggregate([
    { $match: { status: "completed" } },
    { $group: { _id: null, total: { $sum: "$total" } } },
  ]);
  return totalSales[0]?.total || 0;
};
