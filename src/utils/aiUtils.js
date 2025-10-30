// src/utils/aiUtils.js
import { getAIRecommendations } from "../services/aiService.js";

export const generateRecommendations = async (userId, cartItems) => {
  const recs = await getAIRecommendations(userId, cartItems);
  return recs;
};

export const analyzeUserBehavior = (events) => {
  const activityScore = events.length * 2;
  return { activityScore, level: activityScore > 50 ? "high" : "normal" };
};
