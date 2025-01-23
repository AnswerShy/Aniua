'use client';

import Player from './Player';
import { usePlayer } from '@/hooks/usePlayer';
import { Chat } from '@/components/IndexComponent';
import { Section } from '@/components/Shared/SharedComponents';
import { useSearchParams } from 'next/navigation';
import { SocketProvider } from '@/context/SocketContext';
import { useEffect, useState } from 'react';

const PlayerProvider = ({ slug, room }: { slug?: string; room?: string }) => {
  const { playerState, setPlayerState, handleStudio, episodesList } = usePlayer(slug ? slug : null);
  const searchParams = useSearchParams();
  const [roomCode, setRoomCode] = useState<string | null>(room || searchParams.get('room'));

  useEffect(() => {
    const searchRoom = searchParams.get('room');
    if (searchRoom && searchRoom !== roomCode) {
      setRoomCode(searchRoom);
    }
  }, [searchParams, roomCode]);

  const reloadWithRoom = (newRoom: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('room', newRoom);
    window.location.href = url.toString();
  };

  useEffect(() => {
    if (roomCode) {
      document.getElementById('player-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      {roomCode ? (
        <SocketProvider>
          <Section typeOfSection="flexThreeCols" id="player-section">
            <Player
              playerState={playerState}
              setPlayerState={setPlayerState}
              handleStudio={handleStudio}
              episodesList={episodesList}
              room={roomCode}
              classname={room && 'layer1'}
            />
            <Chat />
          </Section>
        </SocketProvider>
      ) : (
        <Section typeOfSection="flexThreeCols" id="player-section">
          <Player
            playerState={playerState}
            setPlayerState={setPlayerState}
            handleStudio={handleStudio}
            episodesList={episodesList}
            room={roomCode}
            classname={room && 'layer1'}
          />
          <input type="button" value="Join Room" onClick={() => reloadWithRoom('qweqweqwe')} />
        </Section>
      )}
    </>
  );
};

export default PlayerProvider;
