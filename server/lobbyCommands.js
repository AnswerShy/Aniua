export default function onLobbyMessage(socket, rooms) {
  try {
    socket.on('message', (data) => {
      const { command, additional } = data;
      const roomCode = [...socket.rooms][1]; // Get the room code (first room is the socket ID)
      if (roomCode) {
        console.log(`[Broadcasting in room ${roomCode}]:`, data);
        socket.to(roomCode).emit('message', { command, additional });
      } else {
        console.warn('No roomCode found for socket:', socket.id);
      }
    });
  } catch (err) {
    console.error('Failed to parse message:', err.message);
  }
}
