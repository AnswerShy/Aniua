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
      rooms.set(roomCode, new Set());
    }
    rooms.get(roomCode).add(socket.id);
    console.log('[ROOM]: ', `Socket ${socket.id} joined room: ${roomCode}`);
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
