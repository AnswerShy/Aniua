'use client';

import { useSearchParams } from 'next/navigation';
import Player from './Player';
import PlayerSocket from './PlayerSocket';
import { usePlayer } from '@/hooks/usePlayer';

const PlayerProvider = ({ slug }: { slug: string }) => {
  const room = useSearchParams().get('room');
  const { playerState, setPlayerState, handleStudio, episodesList } =
    usePlayer(slug);

  return !room ? (
    <Player
      playerState={playerState}
      setPlayerState={setPlayerState}
      handleStudio={handleStudio}
      episodesList={episodesList}
    />
  ) : (
    <PlayerSocket roomCode={room} />
  );
};

export default PlayerProvider;
