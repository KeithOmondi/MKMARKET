// src/services/cartService.js
import { Cart } from "../models/Cart.js";

export const getCart = async (userId) => await Cart.findOne({ userId }).populate("items.product");

export const updateCart = async (userId, items) => {
  return await Cart.findOneAndUpdate({ userId }, { items }, { new: true, upsert: true });
};
