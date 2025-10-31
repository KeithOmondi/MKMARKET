// src/services/smsService.js
import { twilioClient } from "../config/twilio.js";

export const sendSMS = async (phone, message) => {
  await twilioClient.messages.create({ to: phone, from: process.env.TWILIO_NUMBER, body: message });
};
