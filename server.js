import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

import onLobbyMessage from './server/lobbyCommands.js';
import { joinRoom, leaveRoom } from './server/lobbyControls.js';

const rooms = new Map();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    joinRoom(socket, rooms);
    onLobbyMessage(socket, rooms);

    socket.on('send_state', ({ requesterId, videoUrl, timecode }) => {
      console.log(`[SERVER]: Received state for ${requesterId}`);
      io.to(requesterId).emit('state_update', { videoUrl, timecode });
    });

    socket.on('disconnect', () => {
      leaveRoom(socket, rooms);
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
