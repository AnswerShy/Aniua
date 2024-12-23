'use client';

import { useParams } from 'next/navigation';
import SocketClient from '@/components/Room/Room';

const Room = () => {
  const params = useParams();
  const roomCode = params?.roomCode;

  if (!roomCode || typeof roomCode !== 'string') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SocketClient roomCode={roomCode} />
    </div>
  );
};

export default Room;
