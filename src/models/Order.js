// src/models/Order.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
      },
    ],
    total: Number,
    discount: Number,
    shippingFee: Number,
    payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
    shipping: { type: mongoose.Schema.Types.ObjectId, ref: "Shipping" },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled", "refunded"],
      default: "pending",
    },
    trackingNumber: String,
    estimatedDelivery: Date,
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
