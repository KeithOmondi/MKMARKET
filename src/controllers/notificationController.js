import asyncWrapper from "../utils/asyncWrapper.js";
import * as notificationService from "../services/notificationService.js";

export const getNotifications = asyncWrapper(async (req, res) => {
  const notifications = await notificationService.getUserNotifications(req.user.id);
  res.json({ success: true, data: notifications });
});

export const markAsRead = asyncWrapper(async (req, res) => {
  await notificationService.markAsRead(req.user.id, req.params.id);
  res.json({ success: true, message: "Notification marked as read" });
});
