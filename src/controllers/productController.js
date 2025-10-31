import * as productService from "../services/productService.js";
import asyncWrapper from "../utils/asyncWrapper.js";

export const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await productService.getAll(req.query);
  res.json({ success: true, data: products });
});

export const getProduct = asyncWrapper(async (req, res) => {
  const product = await productService.getById(req.params.id);
  res.json({ success: true, data: product });
});

export const createProduct = asyncWrapper(async (req, res) => {
  const product = await productService.create(req.body, req.user.id);
  res.status(201).json({ success: true, data: product });
});

export const updateProduct = asyncWrapper(async (req, res) => {
  const product = await productService.update(req.params.id, req.body);
  res.json({ success: true, data: product });
});

export const deleteProduct = asyncWrapper(async (req, res) => {
  await productService.remove(req.params.id);
  res.json({ success: true, message: "Product deleted" });
});
