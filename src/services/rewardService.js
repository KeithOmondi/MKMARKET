// src/services/rewardService.js
import { User } from "../models/User.js";

export const addRewardPoints = async (userId, points) => {
  const user = await User.findById(userId);
  user.rewardPoints += points;
  await user.save();
  return user.rewardPoints;
};

export const redeemPoints = async (userId, points) => {
  const user = await User.findById(userId);
  if (user.rewardPoints < points) throw new Error("Not enough points");
  user.rewardPoints -= points;
  await user.save();
};
