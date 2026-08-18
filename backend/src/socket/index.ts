import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";



let io: SocketServer;


export const initSocket = (server: HttpServer) => {
  io = new SocketServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },


});

  io.on("connection", (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });

  console.log("⚡ Socket.io server initialized");

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized");
  }

  return io;
};