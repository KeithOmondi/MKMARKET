// src/models/Payment.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    method: String,
    status: { type: String, enum: ["pending", "paid", "failed", "refunded"], default: "pending" },
    transactionId: String,
    amount: Number,
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
