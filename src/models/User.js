// src/models/User.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    address: {
      street: String,
      city: String,
      region: String,
      postalCode: String,
    },
    role: { type: String, enum: ["user", "vendor", "admin"], default: "user" },
    rewardPoints: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
    deviceToken: String, // for push notifications
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
