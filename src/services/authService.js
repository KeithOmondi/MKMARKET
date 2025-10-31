// src/services/authService.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ENV } from "../config/env.js";
import { User } from "../models/User.js";

/**
 * Generate JWT token for a user
 */
export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    ENV.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/**
 * Register a new user
 */
export const registerUser = async (userData) => {
  const { email, password, name, role } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "customer",
  });

  const token = generateToken(user);
  return { user, token };
};

/**
 * Login existing user
 */
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user);
  return { user, token };
};

/**
 * Verify JWT token
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, ENV.JWT_SECRET);
  } catch {
    throw new Error("Invalid or expired token");
  }
};
