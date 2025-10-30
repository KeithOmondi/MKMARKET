// src/config/payment.js
import Stripe from "stripe";
import { ENV } from "./env.js";
import axios from "axios";

export const stripe = new Stripe(ENV.STRIPE_SECRET);

// M-Pesa setup
export const getMpesaAccessToken = async () => {
  const auth = Buffer.from(`${ENV.MPESA.CONSUMER_KEY}:${ENV.MPESA.CONSUMER_SECRET}`).toString("base64");

  const response = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
    headers: { Authorization: `Basic ${auth}` },
  });

  return response.data.access_token;
};
