import { io, Socket } from "socket.io-client";
import * as SecureStore from "expo-secure-store";

const SOCKET_URL = "http://192.168.1.36:3000";

let socket: Socket | null = null;

export const connectSocket = async (): Promise<Socket | null> => {
  try {
    const token = await SecureStore.getItemAsync("authToken");

    if (!token) {
      console.log("❌ No auth token found");
      return null;
    }

    // Already connected
    if (socket?.connected) {
      console.log("🟢 Socket already connected");
      return socket;
    }

    socket = io(SOCKET_URL, {
      transports: ["websocket"],

      // Backend socket.middlewere.ts
      // isi token ko read karega
      auth: {
        token,
      },

      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("🟢 Socket connected:", socket?.id);
    });

    socket.on("connect_error", (error) => {
      console.error(
        "❌ Socket connection error:",
        error.message
      );
    });

    socket.on("disconnect", (reason) => {
      console.log(
        "🔴 Socket disconnected:",
        reason
      );
    });

    return socket;
  } catch (error) {
    console.error(
      "❌ Socket setup error:",
      error
    );

    return null;
  }
};

export const getSocket = (): Socket | null => {
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;

    console.log("🔴 Socket manually disconnected");
  }
};