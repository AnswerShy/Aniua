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
  socket.on('disconnect', () => {
    console.log(`[SERVER]: User ${socket.id} disconnected.`);

    for (const [roomName, users] of rooms.entries()) {
      if (users instanceof Set && users.has(socket.id)) {
        console.log(`[SERVER]: User ${socket.id} removed from room "${roomName}".`);

        if (users.size === 0) {
          rooms.delete(roomName);
          console.log(`[SERVER]: Room "${roomName}" deleted as it is now empty.`);
        }
        break;
      }
    }
  });
}
