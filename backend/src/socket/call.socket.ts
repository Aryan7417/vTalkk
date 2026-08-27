import { Server, Socket } from "socket.io";

export const registerCallSocket = (
  io: Server,
  onlineUsers: Map<string, string>
) => {
  io.on("connection", (socket: Socket) => {

    // ================= CALL USER =================

    socket.on(
      "call-user",
      ({ targetUserId, caller }) => {

        if (!targetUserId) {
          console.log("❌ Target user ID missing");
          return;
        }

        const targetSocketId =
          onlineUsers.get(targetUserId);

        // User offline
        if (!targetSocketId) {
          console.log(
            `🔴 User offline: ${targetUserId}`
          );

          socket.emit("user-offline", {
            userId: targetUserId,
          });

          return;
        }

        console.log(
          `📞 Call request from ${socket.id} to ${targetUserId}`
        );

        // Send incoming call
        io.to(targetSocketId).emit(
          "incoming-call",
          {
            caller,
            callerSocketId: socket.id,
          }
        );
      }
    );


    // ================= ACCEPT CALL =================

    socket.on(
      "accept-call",
      ({ callerSocketId }) => {

        if (!callerSocketId) {
          return;
        }

        console.log(
          `✅ Call accepted by ${socket.id}`
        );

        io.to(callerSocketId).emit(
          "call-accepted",
          {
            receiverSocketId: socket.id,
          }
        );
      }
    );


    // ================= REJECT CALL =================

    socket.on(
      "reject-call",
      ({ callerSocketId }) => {

        if (!callerSocketId) {
          return;
        }

        console.log(
          `❌ Call rejected by ${socket.id}`
        );

        io.to(callerSocketId).emit(
          "call-rejected"
        );
      }
    );


    // ================= END CALL =================

    socket.on(
      "end-call",
      ({ targetUserId }) => {

        if (!targetUserId) {
          return;
        }

        const targetSocketId =
          onlineUsers.get(targetUserId);

        if (!targetSocketId) {
          return;
        }

        console.log(
          `📴 Call ended by ${socket.id}`
        );

        io.to(targetSocketId).emit(
          "call-ended"
        );
      }
    );

  });
};