// src/models/DynamicPricing.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const dynamicPricingSchema = new Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    basePrice: Number,
    demandFactor: Number,
    competitorPrice: Number,
    adjustedPrice: Number,
  },
  { timestamps: true }
);

export const DynamicPricing = mongoose.model("DynamicPricing", dynamicPricingSchema);
