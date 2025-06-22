'use client';

import { io, Socket } from 'socket.io-client';

const URL = process.env.NEXT_PUBLIC_WS_URL;
console.log(URL);

if (!URL) {
  console.warn(`NEXT_PUBLIC_WS_URL not provided!`);
}

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(URL, {
      transports: ['websocket'],
      reconnection: false,
    });

    socket.on('connect', () => {
      console.log('Socket.IO connected:', socket?.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket.IO disconnected');
    });

    socket.on('connect_error', (err) => {
      console.error('Socket.IO connection error:', err);
    });
  }
  return socket;
};
