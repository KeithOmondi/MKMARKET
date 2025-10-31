// src/models/Subscription.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const subscriptionSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    plan: String,
    price: Number,
    renewalDate: Date,
    active: { type: Boolean, default: true },
    paymentMethod: String,
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
