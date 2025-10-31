import asyncWrapper from "../utils/asyncWrapper.js";
import * as subscriptionService from "../services/subscriptionService.js";

export const subscribe = asyncWrapper(async (req, res) => {
  const sub = await subscriptionService.subscribe(req.user.id, req.body.planId);
  res.status(201).json({ success: true, data: sub });
});

export const cancelSubscription = asyncWrapper(async (req, res) => {
  await subscriptionService.cancel(req.user.id);
  res.json({ success: true, message: "Subscription cancelled" });
});
