// src/models/Review.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
