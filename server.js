import { createServer } from 'http';
import next from 'next';
import { WebSocketServer } from 'ws';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const rooms = new Map();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handler(req, res);
  });

  const wss = new WebSocketServer({ server });

  server.on('upgrade', (req, socket, head) => {
    if (req.headers['upgrade']?.toLowerCase() === 'websocket') {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    } else {
      socket.destroy();
    }
  });

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');

    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data);
        if (message.command === 'join') {
          const { roomCode } = message;
          if (!rooms.has(roomCode)) {
            rooms.set(roomCode, new Set());
          }
          rooms.get(roomCode).add(ws); // Add the client to the room
          ws.roomCode = roomCode; // Associate WebSocket with roomCode
          console.log(`Client joined room: ${roomCode}`);
        } else if (
          message.command === 'player_play' ||
          message.command === 'player_pause'
        ) {
          const room = rooms.get(ws.roomCode);
          if (room) {
            for (const client of room) {
              if (client !== ws && client.readyState === client.OPEN) {
                client.send(JSON.stringify({ command: message.command }));
              }
            }
          }
        } else if (message.command === 'player_seek') {
          console.log(`send: ${message.command}`);
          const room = rooms.get(ws.roomCode);
          if (room) {
            for (const client of room) {
              if (client !== ws && client.readyState === client.OPEN) {
                client.send(
                  JSON.stringify({
                    command: message.command,
                    additional: message.additional,
                  }),
                );
              }
            }
          }
        }
      } catch (err) {
        console.error('Failed to parse message:', err.message);
      }
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
      clearInterval(interval);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error occurred:', error);
    });
  });

  server.listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> WebSocket server running on ws://${hostname}:3001`);
  });
});
