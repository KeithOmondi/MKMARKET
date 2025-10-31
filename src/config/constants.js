// src/config/constants.js

export const USER_ROLES = {
  ADMIN: "admin",
  VENDOR: "vendor",
  CUSTOMER: "customer",
};

export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

export const PAYMENT_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
  REFUNDED: "refunded",
};

export const COUPON_TYPES = {
  PERCENTAGE: "percentage",
  FIXED: "fixed",
};

export const REWARD_TYPES = {
  POINTS: "points",
  CASHBACK: "cashback",
};

export const SUBSCRIPTION_TIERS = {
  BASIC: "basic",
  PREMIUM: "premium",
  ENTERPRISE: "enterprise",
};
