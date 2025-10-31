// src/models/Shipping.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const shippingSchema = new Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    provider: String,
    trackingNumber: String,
    status: { type: String, enum: ["pending", "in_transit", "delivered"], default: "pending" },
    estimatedDelivery: Date,
  },
  { timestamps: true }
);

export const Shipping = mongoose.model("Shipping", shippingSchema);
