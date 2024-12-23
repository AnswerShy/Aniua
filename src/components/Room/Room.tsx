// components/SocketClient.tsx
import { useEffect, useState } from 'react';

interface SocketClientProps {
  roomCode: string;
}

const SocketClient: React.FC<SocketClientProps> = ({ roomCode }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!roomCode) return;

    const socket = new WebSocket('ws://localhost:3000');

    setWs(socket);

    socket.onopen = () => {
      console.log('WebSocket connection opened');
      socket.send(JSON.stringify({ command: 'join', roomCode }));
    };

    socket.onmessage = (event) => {
      const { command, additional } = JSON.parse(event.data);
      if (command === 'player_play') {
        console.log('Received player_play');
        sendMessageToIframe('player_play');
      } else if (command === 'player_pause') {
        console.log('Received player_pause');
        sendMessageToIframe('player_pause');
      } else if (command === 'player_seek') {
        sendMessageToIframe('player_seek', additional);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, [roomCode]);

  const sendMessageToIframe = (messageToFrame: string, additional?: string) => {
    const iframe = document.getElementById('myIframe') as HTMLIFrameElement;
    console.log(messageToFrame, additional);
    const message = additional
      ? { command: messageToFrame, seek: Number(additional) }
      : { command: messageToFrame };
    iframe?.contentWindow?.postMessage(message, '*');
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      if (typeof message === 'object') {
        if (message.event === 'start' || message.event === 'play') {
          ws?.send(JSON.stringify({ command: 'player_play' }));
        }
        if (message.event === 'pause') {
          ws?.send(JSON.stringify({ command: 'player_pause' }));
        }
        if (message.event === 'userseek') {
          console.log(message);
          ws?.send(
            JSON.stringify({
              command: 'player_seek',
              additional: `${message.data}`,
            }),
          );
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [ws]);

  return (
    <div
      style={{ top: '50%', position: 'absolute', color: '#a94444 !important' }}
    >
      <h1>Room: {roomCode}</h1>
      <iframe
        id="myIframe"
        src="https://moonanime.art/iframe/vxguiwozjg/?i=12"
        width="600"
        height="400"
      ></iframe>
    </div>
  );
};

export default SocketClient;
