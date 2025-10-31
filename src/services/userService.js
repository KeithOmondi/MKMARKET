import { User } from "../models/User.js";


/**
 * Get all users
 */
export const getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

/**
 * Get a user by ID
 */
export const getUserById = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) throw new Error("User not found");
  return user;
};

/**
 * Update user profile
 */
export const updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) throw new Error("User not found");
  return user;
};

/**
 * Delete a user
 */
export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error("User not found");
  return user;
};
