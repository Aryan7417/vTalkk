import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";

import { registerCallSocket } from "./call.socket";

import {
  socketAuthMiddleware,
  AuthenticatedSocket,
} from "./socket.middlewere";

let io: SocketServer;

// User ID -> Socket ID


const onlineUsers = new Map<string, string>();

export const initSocket = (server: HttpServer) => {


  // Create Socket.io server

  io = new SocketServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  //Authenticate every socket connection


  io.use(socketAuthMiddleware);

  // Handle socket connection


  io.on("connection", (socket: AuthenticatedSocket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    // User ID comes from JWT
    const userId = socket.userId;

    if (userId) {
      // Save User ID -> Socket ID
      onlineUsers.set(userId, socket.id);

      console.log(
        `🟢 User online: ${userId} -> ${socket.id}`
      );
    }

    //  User disconnect
    socket.on("disconnect", () => {
      if (userId) {
        const currentSocketId = onlineUsers.get(userId);

        // Only delete if this is the user's current socket
        if (currentSocketId === socket.id) {
          onlineUsers.delete(userId);
        }

        console.log(
          `🔴 User offline: ${userId}`
        );
      }

      console.log(
        `❌ Socket disconnected: ${socket.id}`
      );
    });
  });

  // 📞 Register call events
  registerCallSocket(io, onlineUsers);

  console.log("⚡ Socket.io server initialized");

  return io;
};


// Get Socket.io instance
export const getIO = () => {
  if (!io) {
    throw new Error(
      "Socket.io is not initialized"
    );
  }

  return io;
};


// Get online users
export const getOnlineUsers = () => {
  return onlineUsers;
};