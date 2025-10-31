// src/controllers/authController.js
import { registerUser, loginUser, verifyToken, generateToken } from "../services/authService.js";
import asyncWrapper from "../utils/asyncWrapper.js";

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 */
export const register = asyncWrapper(async (req, res) => {
  const { name, email, password, role } = req.body;
  const { user, token } = await registerUser({ name, email, password, role });
  res.status(201).json({ success: true, user, token });
});

/**
 * @desc Login user
 * @route POST /api/auth/login
 */
export const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await loginUser(email, password);
  res.status(200).json({ success: true, user, token });
});

/**
 * @desc Refresh JWT token
 * @route POST /api/auth/refresh
 */
export const refreshToken = asyncWrapper(async (req, res) => {
  const { token: oldToken } = req.body;
  if (!oldToken) {
    return res.status(400).json({ success: false, message: "Token is required" });
  }

  const decoded = verifyToken(oldToken);
  const newToken = generateToken({ _id: decoded.id, role: decoded.role });
  res.status(200).json({ success: true, token: newToken });
});

/**
 * @desc Logout user
 * @route POST /api/auth/logout
 */
export const logout = asyncWrapper(async (req, res) => {
  // For stateless JWT, just instruct client to remove token
  res.status(200).json({ success: true, message: "Logged out successfully" });
});
