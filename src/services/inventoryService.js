// src/services/inventoryService.js
import { Product } from "../models/Product.js";

export const reduceStock = async (productId, qty) => {
  return await Product.findByIdAndUpdate(productId, { $inc: { stock: -qty } });
};
