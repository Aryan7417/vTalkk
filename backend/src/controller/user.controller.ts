import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middlewere";
import { updateUserProfile } from "../services/user.service";

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