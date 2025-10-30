// src/utils/commerceUtils.js

export const calculateCartTotal = (items) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const applyDiscount = (total, discount) => {
  return total - (total * discount) / 100;
};

export const calculateTax = (subtotal, taxRate = 0.16) => {
  return subtotal * taxRate;
};

export const calculateShipping = (subtotal) => {
  if (subtotal >= 5000) return 0; // free shipping
  return 250; // base rate
};
