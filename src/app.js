// src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";

import { ENV } from "./config/env.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

// ✅ Route Imports
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import checkoutRoutes from "./routes/checkout.js";
import orderRoutes from "./routes/orders.js";
import paymentRoutes from "./routes/payments.js";
import shippingRoutes from "./routes/shipping.js";
import couponRoutes from "./routes/coupons.js";
import rewardRoutes from "./routes/rewards.js";
import refundRoutes from "./routes/refunds.js";
import reviewRoutes from "./routes/reviews.js";
import wishlistRoutes from "./routes/wishlist.js";
import analyticsRoutes from "./routes/analytics.js";
import vendorRoutes from "./routes/vendors.js";
import adminRoutes from "./routes/admin.js";
import notificationRoutes from "./routes/notifications.js";
import subscriptionRoutes from "./routes/subscriptions.js";
import recommendationRoutes from "./routes/recommendations.js";
import pricingRoutes from "./routes/pricing.js";

const app = express();

// ==================================================
// 🧩 CORE MIDDLEWARES
// ==================================================
app.set("trust proxy", 1); // Needed when behind proxy/load balancer (e.g., Nginx, Render)

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());

// 🔐 CORS Configuration
app.use(
  cors({
    origin:
      ENV.NODE_ENV === "production"
        ? ENV.CLIENT_URL // e.g., https://mkmarket.co.ke
        : "*",
    credentials: true,
  })
);

// 🧮 Logging (different for prod/dev)
if (ENV.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// ⚔️ Global Rate Limiter
app.use("/api", apiLimiter);

// ==================================================
// 🚀 API ROUTES
// ==================================================
const API_PREFIX = "/api/v1";

app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/users`, userRoutes);
app.use(`${API_PREFIX}/products`, productRoutes);
app.use(`${API_PREFIX}/cart`, cartRoutes);
app.use(`${API_PREFIX}/checkout`, checkoutRoutes);
app.use(`${API_PREFIX}/orders`, orderRoutes);
app.use(`${API_PREFIX}/payments`, paymentRoutes);
app.use(`${API_PREFIX}/shipping`, shippingRoutes);
app.use(`${API_PREFIX}/coupons`, couponRoutes);
app.use(`${API_PREFIX}/rewards`, rewardRoutes);
app.use(`${API_PREFIX}/refunds`, refundRoutes);
app.use(`${API_PREFIX}/reviews`, reviewRoutes);
app.use(`${API_PREFIX}/wishlist`, wishlistRoutes);
app.use(`${API_PREFIX}/analytics`, analyticsRoutes);
app.use(`${API_PREFIX}/vendors`, vendorRoutes);
app.use(`${API_PREFIX}/admin`, adminRoutes);
app.use(`${API_PREFIX}/notifications`, notificationRoutes);
app.use(`${API_PREFIX}/subscriptions`, subscriptionRoutes);
app.use(`${API_PREFIX}/recommendations`, recommendationRoutes);
app.use(`${API_PREFIX}/pricing`, pricingRoutes);

// ==================================================
// 🌐 HEALTH & BASE ROUTES
// ==================================================
app.get("/health", (req, res) => res.status(200).send("OK"));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "✅ MKMarket API is running smoothly",
    docs: `${API_PREFIX}/docs`,
    environment: ENV.NODE_ENV,
  });
});

// ==================================================
// 🧯 ERROR HANDLERS
// ==================================================
app.use(notFound);
app.use(errorHandler);

export default app;
