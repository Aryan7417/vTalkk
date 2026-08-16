import crypto from "crypto";
import Otp from "../models/Otp";
import User from "../models/User";

const OTP_EXPIRY_MINUTES = 5;

const generateOTP = (): string => {
  return crypto.randomInt(100000, 1000000).toString();
};

export const sendOTP = async (phone: string) => {
  const otp = generateOTP();

  const expiresAt = new Date(
    Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
  );

  await Otp.deleteMany({ phone });

  await Otp.create({
    phone,
    otp,
    expiresAt,
  });

  


  console.log(`📱 OTP for ${phone}: ${otp}`);

  return {
    message: "OTP sent successfully",
  };
};

export const verifyOTP = async (phone: string, otp: string) => {
  const otpRecord = await Otp.findOne({ phone });

  if (!otpRecord) {
    throw new Error("OTP not found or expired");
  }

  if (otpRecord.expiresAt < new Date()) {
    await Otp.deleteOne({ _id: otpRecord._id });
    throw new Error("OTP expired");
  }

  if (otpRecord.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  let user = await User.findOne({ phone });

  if (!user) {
    user = await User.create({
      phone,
      isVerified: true,
      profileCompleted: false,
    });
  } else {
    user.isVerified = true;
    await user.save();
  }

  await Otp.deleteOne({ _id: otpRecord._id });

  return {
    message: "OTP verified successfully",
    user,
  };
};