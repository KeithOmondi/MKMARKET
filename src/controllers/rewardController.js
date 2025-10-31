import asyncWrapper from "../utils/asyncWrapper.js";
import * as rewardService from "../services/rewardService.js";

export const getRewards = asyncWrapper(async (req, res) => {
  const rewards = await rewardService.getUserRewards(req.user.id);
  res.json({ success: true, data: rewards });
});

export const redeemReward = asyncWrapper(async (req, res) => {
  const result = await rewardService.redeem(req.user.id, req.body.rewardId);
  res.json({ success: true, data: result });
});
