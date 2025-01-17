import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

import onLobbyMessage from './server/lobbyCommands.js';

const rooms = new Map();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('New Socket.IO connection established:', socket.id);

    joinRoom(socket);
    onLobbyMessage(socket, rooms);

    socket.on('send_state', ({ requesterId, videoUrl, timecode }) => {
      console.log(`[SERVER]: Received state for ${requesterId}`);
      io.to(requesterId).emit('state_update', { videoUrl, timecode });
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
      leaveRoom(socket);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

// Function to handle room events
function joinRoom(socket) {
  socket.on('join', ({ roomCode }) => {
    socket.join(roomCode);

    if (!rooms.has(roomCode)) {
      rooms.set(roomCode, { users: new Set(), videoUrl: null, timecode: 0 });
    }

    const room = rooms.get(roomCode);
    room.users.add(socket.id);

    console.log(`[ROOM ${roomCode}]: Socket ${socket.id} joined`);

    // Request state if not the first user
    if (room.users.size > 1) {
      const firstUserId = [...room.users][0]; // Get the first user in this room
      socket.to(firstUserId).emit('request_state', { requesterId: socket.id, roomCode });
      console.log(`[ROOM ${roomCode}]: State requested from first user: ${firstUserId}`);
    }
  });
}

// Function to leave room
function leaveRoom(socket) {
  const roomCode = socket.data.roomCode;
  if (roomCode && rooms.has(roomCode)) {
    rooms.get(roomCode).delete(socket);
    console.log('[ROOM]: ', `Socket ${socket.id} left room: ${roomCode}`);

    // Clean up empty rooms
    if (rooms.get(roomCode).size === 0) {
      rooms.delete(roomCode);
      console.log('[ROOM]: ', `Room ${roomCode} deleted`);
    }
  }
}
