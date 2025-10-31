// src/services/aiService.js
import { generateRecommendations } from "../utils/aiUtils.js";

export const getRecommendations = async (userId) => {
  return await generateRecommendations(userId);
};
