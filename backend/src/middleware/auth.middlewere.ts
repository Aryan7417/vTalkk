import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required",
      });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    const decoded = verifyToken(token);

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      !("userId" in decoded)
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.userId = String(decoded.userId);

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};