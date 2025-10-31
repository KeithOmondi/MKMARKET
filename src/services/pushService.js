// src/services/pushService.js
import { firebaseAdmin } from "../config/firebase.js";

export const sendPushNotification = async (userId, title, message) => {
  const token = await getUserDeviceToken(userId);
  if (!token) return;
  await firebaseAdmin.messaging().send({
    token,
    notification: { title, body: message },
  });
};
