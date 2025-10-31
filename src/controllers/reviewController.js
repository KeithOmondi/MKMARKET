import asyncWrapper from "../utils/asyncWrapper.js";
import * as reviewService from "../services/reviewService.js";

export const createReview = asyncWrapper(async (req, res) => {
  const review = await reviewService.create(req.user.id, req.body);
  res.status(201).json({ success: true, data: review });
});

export const getReviews = asyncWrapper(async (req, res) => {
  const reviews = await reviewService.getForProduct(req.params.productId);
  res.json({ success: true, data: reviews });
});
