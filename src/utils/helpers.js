// src/utils/helpers.js

export const toTitleCase = (str) =>
  str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

export const generateRandomCode = (length = 6) => {
  return Math.random().toString(36).substring(2, 2 + length).toUpperCase();
};

export const paginate = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return { skip, limit };
};

export const calculatePercentage = (value, percent) => {
  return (value * percent) / 100;
};
