// src/models/Analytics.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const analyticsSchema = new Schema(
  {
    metric: String,
    value: Number,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Analytics = mongoose.model("Analytics", analyticsSchema);
