import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import { registerCallSocket } from "./call.socket";

let io: SocketServer;

// User ID -> Socket ID
const onlineUsers = new Map<string, string>();

export const initSocket = (server: HttpServer) => {
  io = new SocketServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    // Register user
    socket.on("register-user", (userId: string) => {
      onlineUsers.set(userId, socket.id);

      console.log(
        `🟢 User online: ${userId} -> ${socket.id}`
      );
    });

    // User disconnect
    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);

          console.log(
            `🔴 User offline: ${userId}`
          );

          break;
        }
      }

      console.log(
        `❌ User disconnected: ${socket.id}`
      );
    });
  });

  registerCallSocket(io, onlineUsers);

  console.log("⚡ Socket.io server initialized");

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized");
  }

  return io;
};

export const getOnlineUsers = () => {
  return onlineUsers;
};