import asyncWrapper from "../utils/asyncWrapper.js";
import * as adminService from "../services/adminService.js";

export const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await adminService.getAllUsers();
  res.json({ success: true, data: users });
});

export const getAllOrders = asyncWrapper(async (req, res) => {
  const orders = await adminService.getAllOrders();
  res.json({ success: true, data: orders });
});

export const manageVendor = asyncWrapper(async (req, res) => {
  const vendor = await adminService.updateVendor(req.params.id, req.body);
  res.json({ success: true, data: vendor });
});
