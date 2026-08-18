import { Socket } from "socket.io";
import { verifyToken } from "../utils/jwt";

export interface AuthenticatedSocket extends Socket {
  userId?: string;
}

export const socketAuthMiddleware = (
  socket: AuthenticatedSocket,
  next: (err?: Error) => void
) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(
        new Error("Authentication token is required")
      );
    }

    const decoded = verifyToken(token);

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      !("userId" in decoded)
    ) {
      return next(new Error("Invalid token"));
    }

    socket.userId = String(decoded.userId);

    next();
  } catch (error) {
    next(new Error("Invalid or expired token"));
  }
};