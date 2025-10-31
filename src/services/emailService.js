// src/services/emailService.js
import nodemailer from "nodemailer";
import { ENV } from "../config/env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: ENV.EMAIL_USER, pass: ENV.EMAIL_PASS },
});

export const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({ from: ENV.EMAIL_USER, to, subject, html });
};
