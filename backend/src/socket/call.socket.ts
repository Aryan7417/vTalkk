import { Server } from "socket.io";

export const registerCallSocket = (
  io: Server,
  onlineUsers: Map<string, string>
) => {
  io.on("connection", (socket) => {

    // ---------------- Call request ----------------

    socket.on(
      "call-user",
      ({ targetUserId, caller }) => {

        const targetSocketId =
          onlineUsers.get(targetUserId);

        if (!targetSocketId) {
          socket.emit("user-offline", {
            userId: targetUserId,
          });

          return;
        }

        console.log(
          `📞 Call request from ${socket.id} to ${targetUserId}`
        );

        io.to(targetSocketId).emit(
          "incoming-call",
          {
            caller,
            callerSocketId: socket.id,
          }
        );
      }
    );


    // ---------------- Accept call ----------------

    socket.on(
      "accept-call",
      ({ callerSocketId }) => {

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


    // ---------------- Reject call ----------------

    socket.on(
      "reject-call",
      ({ callerSocketId }) => {

        console.log(
          `❌ Call rejected by ${socket.id}`
        );

        io.to(callerSocketId).emit(
          "call-rejected"
        );
      }
    );


    // ---------------- End call ----------------

    socket.on(
      "end-call",
      ({ targetUserId }) => {

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