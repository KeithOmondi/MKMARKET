// src/services/reviewService.js
import { Review } from "../models/Review.js";

export const addReview = async (productId, userId, rating, comment) => {
  return await Review.create({ productId, userId, rating, comment });
};

export const getProductReviews = async (productId) => {
  return await Review.find({ productId }).populate("userId", "name");
};
