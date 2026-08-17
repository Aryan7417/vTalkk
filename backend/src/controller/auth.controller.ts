import { Request, Response } from "express";
import {
  sendOTP,
  verifyOTP,
  getCurrentUser,
} from "../services/auth.service";
import { AuthRequest } from "../middleware/auth.middlewere";


export const sendOtpController = async (
  req: Request,
  res: Response
) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const result = await sendOTP(phone);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Send OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};




export const getCurrentUserController = async (
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

    const user = await getCurrentUser(req.userId);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get Current User Error:", error);

    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "User not found",
    });
  }
};



export const verifyOtpController = async (
  req: Request,
  res: Response
) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: "Phone number and OTP are required",
      });
    }

    const result = await verifyOTP(phone, otp);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);

    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "OTP verification failed",
    });
  }
};