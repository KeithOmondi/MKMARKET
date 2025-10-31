import asyncWrapper from "../utils/asyncWrapper.js";
import * as refundService from "../services/refundService.js";

export const requestRefund = asyncWrapper(async (req, res) => {
  const refund = await refundService.request(req.user.id, req.body);
  res.status(201).json({ success: true, data: refund });
});

export const getRefunds = asyncWrapper(async (req, res) => {
  const refunds = await refundService.getUserRefunds(req.user.id);
  res.json({ success: true, data: refunds });
});
