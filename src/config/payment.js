// src/config/payment.js
import axios from "axios";
import { ENV } from "./env.js";

/**
 * Generate an M-Pesa Access Token
 */
export const getMpesaAccessToken = async () => {
  try {
    const credentials = `${ENV.MPESA.CONSUMER_KEY}:${ENV.MPESA.CONSUMER_SECRET}`;
    const auth = Buffer.from(credentials).toString("base64");

    const { data } = await axios.get(
      `${ENV.MPESA.BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: { Authorization: `Basic ${auth}` },
      }
    );

    return data.access_token;
  } catch (error) {
    console.error("❌ Failed to generate M-Pesa token:", error.response?.data || error.message);
    throw new Error("M-Pesa token generation failed");
  }
};

/**
 * Initiate STK Push (customer payment request)
 */
export const initiateMpesaPayment = async ({
  amount,
  phone,
  accountReference,
  transactionDesc = "Order Payment",
}) => {
  try {
    const token = await getMpesaAccessToken();

    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
    const password = Buffer.from(
      `${ENV.MPESA.SHORTCODE}${ENV.MPESA.PASSKEY}${timestamp}`
    ).toString("base64");

    const payload = {
      BusinessShortCode: ENV.MPESA.SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: ENV.MPESA.SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: `${ENV.BASE_URL}/api/payments/mpesa/callback`,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc,
    };

    const { data } = await axios.post(
      `${ENV.MPESA.BASE_URL}/mpesa/stkpush/v1/processrequest`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return data;
  } catch (error) {
    console.error("❌ M-Pesa STK Push failed:", error.response?.data || error.message);
    throw new Error("M-Pesa payment initiation failed");
  }
};

/**
 * Unified payment gateway wrapper (for multiple methods)
 */
export const paymentGateway = {
  charge: initiateMpesaPayment,
};
