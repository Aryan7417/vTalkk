import { Request, Response } from "express";
import {
  sendOTP,
  verifyOTP,
} from "../services/auth.service";



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