'use client';

import Player from './Player';
import { usePlayer } from '@/hooks/usePlayer';
import { Chat } from '@/components/IndexComponent';
import { Section } from '@/components/Shared/SharedComponents';
import { SocketProvider } from '@/context/SocketContext';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const PlayerProvider = ({ slug }: { slug?: string }) => {
  const { playerState, setPlayerState, handleStudio, episodesList } = usePlayer(slug ?? null);

  const searchParams = useSearchParams();
  const codeOfRoom = searchParams.get('room') || '';
  // For future features
  // const timingStart = searchParams.get('s') || '';

  const reloadWithRoom = useCallback(() => {
    const newRoom = Math.random().toString(36).substring(2, 8);
    const url = new URL(window.location.href);
    url.searchParams.set('room', newRoom);
    window.location.href = url.toString();
  }, []);

  useEffect(() => {
    if (codeOfRoom) {
      document.getElementById('player-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      {codeOfRoom ? (
        <SocketProvider>
          <Section typeOfSection="flexThreeCols" id="player-section">
            <Player playerState={playerState} setPlayerState={setPlayerState} handleStudio={handleStudio} episodesList={episodesList} room={codeOfRoom} classname={codeOfRoom && 'layer1'} />
            <Chat />
          </Section>
        </SocketProvider>
      ) : (
        <Section typeOfSection="flexThreeCols" id="player-section">
          <Player startW2G={reloadWithRoom} playerState={playerState} setPlayerState={setPlayerState} handleStudio={handleStudio} episodesList={episodesList} room={codeOfRoom} />
        </Section>
      )}
    </>
  );
};

export default PlayerProvider;
