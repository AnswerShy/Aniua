import { useCallback, useEffect, useState } from 'react';

const iframeCommands = {
  player_play: 'player_play',
  player_pause: 'player_pause',
  player_seek: 'player_seek',
};

const envCommands = {
  player_url: 'player_url',
  chat_message: 'chat_message',
} as const;

export const usePlayerSocket = (roomCode: string | null, iframe: HTMLIFrameElement | null) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const sendMessageToIframe = useCallback(
    (messageToFrame: string, additional?: string | null) => {
      console.log(messageToFrame, additional);
      const message = additional
        ? { command: messageToFrame, seek: Number(additional) }
        : { command: messageToFrame };
      iframe?.contentWindow?.postMessage(message, '*');
    },
    [iframe],
  );

  useEffect(() => {
    if (!roomCode) return;
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL as string);

    setWs(socket);

    socket.onopen = () => {
      console.log('WebSocket connection opened');
      socket.send(JSON.stringify({ command: 'join', roomCode }));
    };

    socket.onmessage = (event) => {
      const { command, additional } = JSON.parse(event.data);
      if (command in iframeCommands) {
        sendMessageToIframe(command, additional);
      } else if (command == envCommands.player_url) {
        console.log(command, additional);
        iframe?.setAttribute('src', additional);
      } else if (command == envCommands.chat_message) {
        console.log(command, additional);
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
  }, [roomCode, sendMessageToIframe, iframe]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      if (typeof message === 'object') {
        if (message.event === 'start' || message.event === 'play') {
          ws?.send(JSON.stringify({ command: iframeCommands.player_play }));
        }
        if (message.event === 'pause') {
          ws?.send(JSON.stringify({ command: iframeCommands.player_pause }));
        }
        if (message.event === 'userseek') {
          ws?.send(
            JSON.stringify({
              command: iframeCommands.player_seek,
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

  useEffect(() => {
    console.log('handlePlayerUrl', videoUrl);
    if (videoUrl) ws?.send(JSON.stringify({ command: envCommands.player_url, additional: videoUrl }));
  }, [videoUrl, ws]);

  return { sendMessageToIframe, envCommands, setVideoUrl };
};
