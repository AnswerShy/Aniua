import logWithTime from './log.js';

export function joinRoom(socket, rooms) {
  socket.on('join', ({ roomCode }) => {
    socket.join(roomCode);

    if (!rooms.has(roomCode)) {
      rooms.set(roomCode, { users: new Set(), videoUrl: null, timecode: 0 });
    }

    const room = rooms.get(roomCode);
    room.users.add(socket.id);

    logWithTime(`[ROOM ${roomCode}]: Socket ${socket.id} joined`);

    if (room.users.size > 1) {
      const firstUserId = [...room.users][0];
      socket.to(firstUserId).emit('request_state', { requesterId: socket.id, roomCode });
      logWithTime(`[ROOM ${roomCode}]: State requested from first user: ${firstUserId}`);
    }
  });
}

export function leaveRoom(socket, rooms) {
  const roomCode = socket.data.roomCode;

  if (roomCode && rooms.has(roomCode)) {
    rooms.get(roomCode).delete(socket);
    logWithTime(`[ROOM]: Socket ${socket.id} left room: ${roomCode}`);

    if (rooms.get(roomCode).size === 0) {
      rooms.delete(roomCode);
      logWithTime(`[ROOM]: Room ${roomCode} deleted`);
    }
  }
}
