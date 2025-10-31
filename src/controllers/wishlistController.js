import asyncWrapper from "../utils/asyncWrapper.js";
import * as wishlistService from "../services/wishlistService.js";

export const getWishlist = asyncWrapper(async (req, res) => {
  const wishlist = await wishlistService.getUserWishlist(req.user.id);
  res.json({ success: true, data: wishlist });
});

export const addToWishlist = asyncWrapper(async (req, res) => {
  const wishlist = await wishlistService.add(req.user.id, req.body.productId);
  res.status(201).json({ success: true, data: wishlist });
});

export const removeFromWishlist = asyncWrapper(async (req, res) => {
  const wishlist = await wishlistService.remove(req.user.id, req.params.productId);
  res.json({ success: true, data: wishlist });
});
