'use client';

import Player from './Player';
import { usePlayer } from '@/hooks/usePlayer';
import { Chat } from '@/components/IndexComponent';
import { Section } from '@/components/Shared/SharedComponents';
import { useSearchParams } from 'next/navigation';
import { SocketProvider } from '@/context/SocketContext';

const PlayerProvider = ({ slug, room }: { slug?: string; room?: string }) => {
  const { playerState, setPlayerState, handleStudio, episodesList } = usePlayer(slug ? slug : null);
  const roomCode = room ? room : useSearchParams().get('room');

  return (
    <SocketProvider>
      <Section typeOfSection="flexThreeCols">
        <Player
          playerState={playerState}
          setPlayerState={setPlayerState}
          handleStudio={handleStudio}
          episodesList={episodesList}
          room={roomCode}
          classname={room && 'layer1'}
        />
        {roomCode && <Chat />}
      </Section>
    </SocketProvider>
  );
};

export default PlayerProvider;
