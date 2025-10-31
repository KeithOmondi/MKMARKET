// src/services/orderService.js
import { Order } from "../models/Order.js";
import { addJob } from "../jobs/queue.js";

export const createOrder = async (data) => {
  const order = await Order.create(data);
  await addJob("order", { order });
  return order;
};

export const updateOrderStatus = async (orderId, status) => {
  return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
};
