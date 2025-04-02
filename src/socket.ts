'use client';

import { io, Socket } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : process.env.NEXT_PUBLIC_WS_URL;
let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(URL, {
      transports: ['websocket'], // Use WebSocket for better performance
      reconnection: false, // Automatically reconnect
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
