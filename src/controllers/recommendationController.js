import asyncWrapper from "../utils/asyncWrapper.js";
import * as recommendationService from "../services/recommendationService.js";

export const getRecommendations = asyncWrapper(async (req, res) => {
  const recs = await recommendationService.getForUser(req.user.id);
  res.json({ success: true, data: recs });
});
