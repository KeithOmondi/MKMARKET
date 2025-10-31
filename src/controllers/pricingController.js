import asyncWrapper from "../utils/asyncWrapper.js";
import * as pricingService from "../services/pricingService.js";

export const getDynamicPrice = asyncWrapper(async (req, res) => {
  const price = await pricingService.getDynamicPrice(req.params.productId);
  res.json({ success: true, data: price });
});

export const updatePricingModel = asyncWrapper(async (req, res) => {
  const model = await pricingService.updateModel(req.body);
  res.json({ success: true, data: model });
});
