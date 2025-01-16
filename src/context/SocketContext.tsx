'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSocket } from '../socket';

interface SocketContextProps {
  socket: ReturnType<typeof getSocket>;
}

const SocketContext = createContext<SocketContextProps | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket] = useState(() => getSocket());

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context.socket;
};
