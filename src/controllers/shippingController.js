// src/controllers/shippingController.js
import * as shippingService from "../services/shippingService.js";
import asyncWrapper from "../utils/asyncWrapper.js";

/**
 * Get available shipping methods
 */
export const getShippingMethods = asyncWrapper(async (req, res) => {
  const methods = await shippingService.getAvailableMethods();
  res.json({ success: true, data: methods });
});

/**
 * Calculate shipping cost for a given order or destination
 */
export const calculateShipping = asyncWrapper(async (req, res) => {
  const cost = await shippingService.calculateCost(req.body);
  res.json({ success: true, data: cost });
});

/**
 * Track shipment by tracking ID
 */
export const trackShipment = asyncWrapper(async (req, res) => {
  const tracking = await shippingService.trackShipment(req.params.trackingId);
  res.json({ success: true, data: tracking });
});
