// src/services/recommendationService.js
import {Product} from "../models/Product.js";
import {Order} from "../models/Order.js";
import {Recommendation} from "../models/Recommendation.js";
import { AppError } from "../utils/errorHandler.js";

/**
 * Get personalized recommendations for a user
 * Based on order history and viewed categories
 */
export const getRecommendationsForUser = async (userId) => {
  // 1️⃣ Check if cached recommendations exist
  const existing = await Recommendation.findOne({ user: userId });
  if (existing && existing.products.length > 0) {
    return existing.products;
  }

  // 2️⃣ Get user’s past order categories
  const pastOrders = await Order.find({ user: userId }).populate("items.product");
  const categories = pastOrders.flatMap((order) =>
    order.items.map((item) => item.product.category)
  );

  if (categories.length === 0) {
    // Return trending products as fallback
    return await getTrendingProducts();
  }

  // 3️⃣ Get products in the same categories (excluding already bought)
  const boughtProductIds = pastOrders.flatMap((o) => o.items.map((i) => i.product._id));
  const recommendations = await Product.find({
    category: { $in: categories },
    _id: { $nin: boughtProductIds },
  })
    .limit(10)
    .lean();

  // 4️⃣ Cache them for later quick retrieval
  await Recommendation.findOneAndUpdate(
    { user: userId },
    { products: recommendations },
    { upsert: true, new: true }
  );

  return recommendations;
};

/**
 * Get trending or best-selling products globally
 */
export const getTrendingProducts = async () => {
  const trending = await Product.find()
    .sort({ sold: -1, rating: -1 })
    .limit(10)
    .lean();
  return trending;
};

/**
 * Get related products for a given product (by category or tags)
 */
export const getRelatedProducts = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) throw new AppError(404, "Product not found");

  const related = await Product.find({
    _id: { $ne: productId },
    category: product.category,
  })
    .limit(10)
    .lean();

  return related;
};

/**
 * Generate AI-powered recommendations (optional future extension)
 */
export const generateAIRecommendations = async (userId, aiModel) => {
  const userOrders = await Order.find({ user: userId }).populate("items.product");
  const products = userOrders.flatMap((o) => o.items.map((i) => i.product));

  // Example pseudo-integration with AI service
  const recommended = await aiModel.suggestProducts(products.map((p) => p.title));
  return recommended;
};
