// src/config/sendy.js
import axios from "axios";
import { ENV } from "./env.js";

export const sendyClient = axios.create({
  baseURL: ENV.SENDY.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ENV.SENDY.API_KEY}`,
  },
});

export const getDeliveryQuote = async (pickup, destination, packageDetails) => {
  const { data } = await sendyClient.post("/delivery/quote", {
    pickup,
    destination,
    package: packageDetails,
  });
  return data;
};
