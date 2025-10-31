// src/services/wishlistService.js
import { Wishlist } from "../models/Wishlist.js";

export const addToWishlist = async (userId, productId) => {
  const wishlist = await Wishlist.findOneAndUpdate(
    { userId },
    { $addToSet: { products: productId } },
    { upsert: true, new: true }
  );
  return wishlist;
};
