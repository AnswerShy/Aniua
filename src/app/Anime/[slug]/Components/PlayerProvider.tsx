'use client';

import { useSearchParams } from 'next/navigation';
import Player from './Player';
import { usePlayer } from '@/hooks/usePlayer';
import { Chat } from '@/components/IndexComponent';
import { Section } from '@/components/Shared/SharedComponents';

const PlayerProvider = ({ slug }: { slug: string }) => {
  const room = useSearchParams().get('room');
  const { playerState, setPlayerState, handleStudio, episodesList } = usePlayer(slug);

  return (
    <Section typeOfSection="flexThreeCols">
      <Player
        playerState={playerState}
        setPlayerState={setPlayerState}
        handleStudio={handleStudio}
        episodesList={episodesList}
        room={room}
        classname={room && 'layer1'}
      />
      {room && <Chat />}
    </Section>
  );
};

export default PlayerProvider;
