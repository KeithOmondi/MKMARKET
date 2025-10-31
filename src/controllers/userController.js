// src/controllers/userController.js
import * as userService from "../services/userService.js";
import asyncWrapper from "../utils/asyncWrapper.js";

/**
 * @desc Get a single user profile (self)
 * @route GET /api/users/profile
 * @access Private
 */
export const getUserProfile = asyncWrapper(async (req, res) => {
  const user = await userService.getProfile(req.user.id);
  res.status(200).json({ success: true, data: user });
});

/**
 * @desc Update user profile
 * @route PUT /api/users/profile
 * @access Private
 */
export const updateUserProfile = asyncWrapper(async (req, res) => {
  const updatedUser = await userService.updateProfile(req.user.id, req.body);
  res.status(200).json({ success: true, data: updatedUser });
});

/**
 * @desc Get all users (admin only)
 * @route GET /api/users
 * @access Admin
 */
export const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json({ success: true, data: users });
});

/**
 * @desc Delete user (admin only)
 * @route DELETE /api/users/:id
 * @access Admin
 */
export const deleteUser = asyncWrapper(async (req, res) => {
  const deleted = await userService.deleteUser(req.params.id);
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    data: deleted,
  });
});
