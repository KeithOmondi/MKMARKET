// src/services/productService.js

import { Product } from "../models/Product.js";
import { AppError } from "../utils/errorHandler.js";


/**
 * Create a new product
 */
export const createProduct = async (productData) => {
  const product = await Product.create(productData);
  return product;
};

/**
 * Get all products (with optional filters, pagination, and sorting)
 */
export const getAllProducts = async (filters = {}, options = {}) => {
  const { page = 1, limit = 20, sort = "-createdAt" } = options;

  const products = await Product.find(filters)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("vendor", "name email");

  const total = await Product.countDocuments(filters);

  return {
    products,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get single product by ID
 */
export const getProductById = async (id) => {
  const product = await Product.findById(id).populate("vendor", "name email");
  if (!product) throw new AppError(404, "Product not found");
  return product;
};

/**
 * Update a product
 */
export const updateProduct = async (id, updates) => {
  const product = await Product.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  if (!product) throw new AppError(404, "Product not found");
  return product;
};

/**
 * Delete a product
 */
export const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new ApiError(404, "Product not found");
  return product;
};
