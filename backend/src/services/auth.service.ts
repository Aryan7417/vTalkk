import crypto from "crypto";
import Otp from "../models/Otp";
import User from "../models/User";
import { generateToken } from "../utils/jwt";

const OTP_EXPIRY_MINUTES = 5;

// Generate 6 digit OTP


const generateOTP = (): string => {
  return crypto.randomInt(100000, 1000000).toString();
};



// Send OTP



export const sendOTP = async (phone: string) => {
  const otp = generateOTP();

  const expiresAt = new Date(
    Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
  );


  // Delete old OTP



  await Otp.deleteMany({ phone });

  // Save new OTP


  await Otp.create({
    phone,
    otp,
    expiresAt,
  });

  // Development only


  console.log(`📱 OTP for ${phone}: ${otp}`);

  return {
    message: "OTP sent successfully",
  };
};


// Verify OTP




export const verifyOTP = async (
  phone: string,
  otp: string
) => {

  // Find OTP



  const otpRecord = await Otp.findOne({ phone });

  if (!otpRecord) {
    throw new Error("OTP not found or expired");
  }

  // Check expiry


  if (otpRecord.expiresAt < new Date()) {
    await Otp.deleteOne({
      _id: otpRecord._id,
    });

    throw new Error("OTP expired");
  }

  // Check OTP


  if (otpRecord.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  // Find user


  let user = await User.findOne({ phone });

  // Create new user

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

  // Delete OTP after successful verification


  await Otp.deleteOne({
    _id: otpRecord._id,
  });

  // Generate JWT


  const token = generateToken(
    user._id.toString()
  );

  return {
    message: "OTP verified successfully",
    token,
    user: {
      id: user._id,
      phone: user.phone,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      profileCompleted: user.profileCompleted,
    },
  };
};