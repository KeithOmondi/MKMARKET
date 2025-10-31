// src/services/checkoutService.js

import { Cart } from "../models/Cart.js";
import { Order } from "../models/Order.js";
import { Payment } from "../models/Payment.js";
import { AppError } from "../utils/errorHandler.js";

/**
 * Process checkout from a user's cart
 */
export const processCheckout = async (userId, shippingInfo, paymentMethod) => {
  // Get the user's cart
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart || cart.items.length === 0) {
    throw new AppError(400, "Your cart is empty.");
  }

  // Calculate total amount
  let totalAmount = 0;
  cart.items.forEach((item) => {
    totalAmount += item.product.price * item.quantity;
  });

  // Simulate payment processing (in production integrate Stripe, PayPal, etc.)
  const payment = await Payment.create({
    user: userId,
    amount: totalAmount,
    method: paymentMethod || "manual",
    status: "pending",
  });

  // Create order
  const order = await Order.create({
    user: userId,
    items: cart.items.map((i) => ({
      product: i.product._id,
      quantity: i.quantity,
      price: i.product.price,
    })),
    totalAmount,
    shippingInfo,
    payment: payment._id,
    status: "processing",
  });

  // Deduct stock
  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.product._id, {
      $inc: { stock: -item.quantity },
    });
  }

  // Clear cart
  cart.items = [];
  await cart.save();

  // Update payment status (mock)
  payment.status = "completed";
  await payment.save();

  return { order, payment };
};

/**
 * Get a user’s orders
 */
export const getUserOrders = async (userId) => {
  const orders = await Order.find({ user: userId })
    .populate("items.product", "name price")
    .populate("payment", "status amount method createdAt");
  return orders;
};

/**
 * Get single order details
 */
export const getOrderById = async (orderId) => {
  const order = await Order.findById(orderId)
    .populate("items.product", "name price")
    .populate("payment", "status amount method createdAt");
  if (!order) throw new AppError(404, "Order not found");
  return order;
};
