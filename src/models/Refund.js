// src/models/Refund.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const refundSchema = new Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reason: String,
    status: { type: String, enum: ["requested", "approved", "rejected", "processed"], default: "requested" },
    amount: Number,
  },
  { timestamps: true }
);

export const Refund = mongoose.model("Refund", refundSchema);
