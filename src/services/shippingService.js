// src/services/shippingService.js
import { Shipping } from "../models/Shipping.js";
import { sendyClient } from "../config/sendy.js";
import logger from "../utils/logger.js";

/**
 * Return available shipping methods (could be static, DB-driven, or fetched from Sendy)
 */
export const getAvailableMethods = async () => {
  return [
    { id: "sendy", name: "Sendy Express", eta: "2-3 days", baseRate: 200 },
    { id: "pickup", name: "Store Pickup", eta: "Same day", baseRate: 0 },
  ];
};

/**
 * Calculate shipping cost based on distance, package size, or vendor rules
 */
export const calculateCost = async ({ origin, destination, weight }) => {
  // Example static calculation; integrate Sendy API or Google Maps API for real distance pricing
  const baseRate = 200;
  const distanceFactor = 1.5; // multiplier
  const weightFactor = weight > 5 ? 1.3 : 1.0;

  const cost = baseRate * distanceFactor * weightFactor;

  logger.info(`💰 Calculated shipping cost: ${cost}`);
  return { cost, currency: "KES", estimatedDelivery: "2-3 days" };
};

/**
 * Create shipment (Sendy integration)
 */
export const createShipment = async (order) => {
  const shipment = await sendyClient.createDelivery({
    origin: order.vendor.location,
    destination: order.customer.address,
    packageDetails: order.items,
  });
  logger.info(`🚚 Shipment created: ${shipment.id}`);
  return shipment;
};

/**
 * Track shipment using Sendy API
 */
export const trackShipment = async (trackingId) => {
  return await sendyClient.trackDelivery(trackingId);
};
