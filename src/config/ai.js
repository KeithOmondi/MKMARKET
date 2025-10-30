// src/config/ai.js
import axios from "axios";
import { ENV } from "./env.js";

export const aiClient = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ENV.AI_API_KEY}`,
  },
});

export const generateProductRecommendations = async (input) => {
  const { data } = await aiClient.post("/chat/completions", {
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a product recommendation engine." },
      { role: "user", content: `Recommend related products for: ${input}` },
    ],
  });
  return data.choices?.[0]?.message?.content;
};
