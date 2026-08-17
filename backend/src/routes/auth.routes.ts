import { Router } from "express";

import {
  sendOtpController,
  verifyOtpController,
  getCurrentUserController,
} from "../controller/auth.controller";

import { authMiddleware } from "../middleware/auth.middlewere";

const router = Router();

router.post("/send-otp", sendOtpController);

router.post("/verify-otp", verifyOtpController);

router.get(
  "/me",
  authMiddleware,
  getCurrentUserController
);

export default router;