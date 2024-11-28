const chatApplication = (io, socket) => {
  // Create chat room
  socket.on("join_room", ({ patientId, doctorId }) => {
    const roomName = `${patientId}-${doctorId}`;
    socket.join(roomName);
    console.log("Room Join Succesfully");
  });
  socket.on("send_message", ({ patientId, doctorId, message, senderRole }) => {
    const chatMessage = {
      message,
      senderRole,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    console.log(chatMessage);
    const roomId = `${patientId}-${doctorId}`;
    io.to(roomId).emit("receive_message", chatMessage);
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
};

export default chatApplication;
