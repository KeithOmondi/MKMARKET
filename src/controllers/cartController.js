
import * as cartService from "../services/cartService.js";
import asyncWrapper from "../utils/asyncWrapper.js";

export const getCart = asyncWrapper(async (req, res) => {
  const cart = await cartService.getUserCart(req.user.id);
  res.json({ success: true, data: cart });
});

export const addToCart = asyncWrapper(async (req, res) => {
  const cart = await cartService.addItem(req.user.id, req.body);
  res.status(201).json({ success: true, data: cart });
});

export const removeFromCart = asyncWrapper(async (req, res) => {
  const cart = await cartService.removeItem(req.user.id, req.params.itemId);
  res.json({ success: true, data: cart });
});

export const clearCart = async (userId) => {
  return await Cart.findOneAndUpdate({ user: userId }, { items: [] }, { new: true });
};

