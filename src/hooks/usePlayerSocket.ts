import { useCallback, useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';

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
  const socket = useSocket();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  let time = 0;

  if (!roomCode) {
    return {
      sendMessageToIframe: () => {},
      envCommands: { player_url: 'player_url', chat_message: 'chat_message' } as const,
      setVideoUrl: () => {}, // Default no-op function
    };
  }

  const sendMessageToIframe = useCallback(
    (messageToFrame: string, additional?: string | null) => {
      if (!iframe) {
        console.error('Iframe is not accessible');
        return;
      }

      if (!iframe?.contentWindow) {
        console.error('Iframe contentWindow is not accessible');
        return;
      }

      console.log('Sending message to iframe:', { command: messageToFrame, additional });
      const message = additional
        ? { command: messageToFrame, seek: Number(additional) }
        : { command: messageToFrame };
      iframe?.contentWindow?.postMessage(message, '*');
    },
    [iframe],
  );

  useEffect(() => {
    socket.emit('join', { roomCode });

    socket.on('message', (data: { command: string; additional?: string }) => {
      const { command, additional } = data;
      if (command in iframeCommands) {
        sendMessageToIframe(command, additional || null);
      } else if (command === envCommands.player_url) {
        console.log(command, additional);
        iframe?.setAttribute('src', additional || '');
        document.querySelector('iframe')?.setAttribute('src', additional || '');
      }
    });

    socket.on('request_state', ({ requesterId }) => {
      console.log(`[CLIENT]: Received state request from ${requesterId}`);

      const videoUrl = iframe?.getAttribute('src') || null;
      const timecode = time;
      console.log(videoUrl, timecode);
      socket.emit('send_state', { requesterId, videoUrl, timecode });
    });

    socket.on('state_update', ({ videoUrl, timecode }) => {
      console.log(`@@@`, videoUrl, timecode);
      if (videoUrl) {
        document.querySelector('iframe')?.setAttribute('src', videoUrl);
      }
      if (timecode) {
        sendMessageToIframe(iframeCommands.player_seek, `${timecode}`);
      }
    });

    return () => {
      socket.off('message'); // Clean up listener
    };
  }, [roomCode, sendMessageToIframe, iframe]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      if (typeof message === 'object' && socket.connected) {
        if (message.event === 'start' || message.event === 'play') {
          console.log('Emitting play command', message);
          socket.emit('message', { command: iframeCommands.player_play });
        }
        if (message.event === 'pause') {
          console.log('Emitting pause command', message);
          socket.emit('message', { command: iframeCommands.player_pause });
        }
        if (message.event === 'userseek') {
          console.log('Emitting seek command', message);
          socket.emit('message', {
            command: iframeCommands.player_seek,
            additional: `${message.data}`,
          });
        }
        if (message.event === 'time') {
          console.log(message.data);
          time = message.data;
        }
      } else {
        console.warn('Socket not connected, cannot emit');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    if (videoUrl) {
      console.log('Sending player_url:', videoUrl);
      socket.emit('message', { command: envCommands.player_url, additional: videoUrl });
    }
  }, [videoUrl]);

  return { sendMessageToIframe, envCommands, setVideoUrl, videoUrl };
};
