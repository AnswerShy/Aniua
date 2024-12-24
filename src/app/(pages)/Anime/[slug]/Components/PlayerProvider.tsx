'use client';

import { useSearchParams } from 'next/navigation';
import Player from './Player';
// import PlayerSocket from './PlayerSocket';
import { usePlayer } from '@/hooks/usePlayer';

const PlayerProvider = ({ slug }: { slug: string }) => {
  const room = useSearchParams().get('room');
  const { playerState, setPlayerState, handleStudio, episodesList } = usePlayer(slug);

  return (
    <Player
      playerState={playerState}
      setPlayerState={setPlayerState}
      handleStudio={handleStudio}
      episodesList={episodesList}
      room={room}
    />
  );
};

export default PlayerProvider;
