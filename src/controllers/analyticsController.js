import asyncWrapper from "../utils/asyncWrapper.js";
import * as analyticsService from "../services/analyticsService.js";

export const getSalesAnalytics = asyncWrapper(async (req, res) => {
  const data = await analyticsService.getSalesAnalytics(req.query);
  res.json({ success: true, data });
});

export const getTrafficAnalytics = asyncWrapper(async (req, res) => {
  const data = await analyticsService.getTrafficData(req.query);
  res.json({ success: true, data });
});
