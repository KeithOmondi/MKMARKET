import { AppError } from "../utils/errorHandler.js";
import Subscription from "../models/subscriptionModel.js";

export const verifySubscription = async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) return next(new AppError("Unauthorized", 401));

  const subscription = await Subscription.findOne({
    user: userId,
    status: "active",
  });

  if (!subscription) {
    return next(new AppError("You need an active subscription for this action.", 403));
  }

  next();
};
