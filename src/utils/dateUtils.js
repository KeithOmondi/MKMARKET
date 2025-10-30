// src/utils/dateUtils.js
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (date, format = "YYYY-MM-DD HH:mm:ss") =>
  dayjs(date).tz("Africa/Nairobi").format(format);

export const addDays = (date, days) => dayjs(date).add(days, "day").toDate();

export const isExpired = (date) => dayjs().isAfter(dayjs(date));

export const getDeliveryEstimate = (distanceKm) => {
  if (distanceKm <= 10) return "Same day";
  if (distanceKm <= 50) return "1-2 days";
  return "3-5 days";
};
