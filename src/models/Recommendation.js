// src/models/Recommendation.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const recommendationSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    algorithm: String, // e.g., "collaborative", "content-based"
  },
  { timestamps: true }
);

export const Recommendation = mongoose.model("Recommendation", recommendationSchema);
