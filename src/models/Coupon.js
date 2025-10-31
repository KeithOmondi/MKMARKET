// src/models/Coupon.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const couponSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    type: { type: String, enum: ["percentage", "flat"], required: true },
    value: { type: Number, required: true },
    expiry: Date,
    isActive: { type: Boolean, default: true },
    usageLimit: Number,
    usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Coupon = mongoose.model("Coupon", couponSchema);
