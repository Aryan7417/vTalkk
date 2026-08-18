import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middlewere";

import {
  updateUserProfile,
  getAllUsers,
} from "../services/user.service";


// Update Profile


export const updateProfileController = async (

  req: AuthRequest,

  res: Response
) => {
  try {
    const { name, email } = req.body;

    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const user = await updateUserProfile(
      req.userId,
      name,
      email
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update profile",
    });
  }
};


// Get All Users


export const getAllUsersController = async (
  req: AuthRequest,
  res: Response

) => {

  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const users = await getAllUsers(req.userId);

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get users",

        });

  }

};