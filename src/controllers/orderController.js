
import * as orderService from "../services/orderService.js";
import asyncWrapper from "../utils/asyncWrapper.js";

export const createOrder = asyncWrapper(async (req, res) => {
  const order = await orderService.create(req.user.id, req.body);
  res.status(201).json({ success: true, data: order });
});

export const getOrders = asyncWrapper(async (req, res) => {
  const orders = await orderService.getUserOrders(req.user.id);
  res.json({ success: true, data: orders });
});

export const getOrderById = asyncWrapper(async (req, res) => {
  const order = await orderService.getById(req.params.id);
  res.json({ success: true, data: order });
});

export const getUserOrders = asyncWrapper(async (req, res) => {
  const orders = await orderService.getUserOrders(req.user.id);
  res.json({ success: true, data: orders });
});

