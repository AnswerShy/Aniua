import logWithTime from './log';

export default function onLobbyMessage(socket, rooms) {
  try {
    socket.on('message', (data) => {
      const { command, additional } = data;
      const roomCode = [...socket.rooms][1];
      if (roomCode) {
        logWithTime(`[Broadcasting in room ${roomCode}]: ${data}`);
        socket.to(roomCode).emit('message', { command, additional });
      } else {
        logWithTime(`No roomCode found for socket: ${socket.id}`);
      }
    });
    socket.on('chat_message', (data) => {
      const { command, additional, username, avatar } = data;
      const roomCode = [...socket.rooms][1];
      if (roomCode) {
        logWithTime(`[Broadcasting message in room ${roomCode}]: ${data}`);
        socket.to(roomCode).emit('chat_message', { command, additional, username, avatar });
      } else {
        logWithTime(`No roomCode found for socket: ${socket.id}`, 'error');
      }
    });
  } catch (err) {
    logWithTime(`Failed to parse message: ${err.message}`, 'error');
  }
}
