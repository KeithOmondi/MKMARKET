// src/models/Product.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: String,
    images: [String],
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category: String,
    subCategory: String,
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    averageRating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    dynamicPricing: { type: mongoose.Schema.Types.ObjectId, ref: "DynamicPricing" },
    recommendations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recommendation" }],
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
