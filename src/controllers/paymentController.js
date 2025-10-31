// src/controllers/paymentController.js
import * as paymentService from "../services/paymentService.js";import asyncWrapper from "../utils/asyncWrapper.js";
;

export const initiatePayment = asyncWrapper(async (req, res) => {
  const result = await paymentService.initiate(req.body);
  res.json({ success: true, data: result });
});

export const verifyPayment = asyncWrapper(async (req, res) => {
  const confirmation = await paymentService.confirm(req.body);
  res.json({ success: true, data: confirmation });
});
