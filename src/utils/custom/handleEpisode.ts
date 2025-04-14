// Desc: Helper function to handle the episode change in the player component
import FetchServiceInstance from '@/app/api';
import { Dispatch, SetStateAction } from 'react';

interface handleEpisodeInterface {
  playerState: Dispatch<SetStateAction<playerStateInterface>>;
  id: number;
  studio?: number;
  episodesList: EpisodeListInterface;
}

async function handleEpisode({ playerState, id, studio = 0 }: handleEpisodeInterface) {
  playerState((prevState) => ({ ...prevState, isPlayerLoading: true, episodeID: id }));

  try {
    const newEpisode: EpisodeListInterface = await FetchServiceInstance.fetchEpisode(id);

    const isNewEpisodeHasArrayOfPlayers = Array.isArray(newEpisode.players);

    const studios: string[] = isNewEpisodeHasArrayOfPlayers
      ? newEpisode.players.map((player: PlayersInEpisode) => player.studio)
      : [];

    let episodeUrl: string | null = null;

    if (isNewEpisodeHasArrayOfPlayers && newEpisode.players[studio]) {
      episodeUrl = newEpisode.players[studio].videos[0]?.video_url || null;
    } else if (isNewEpisodeHasArrayOfPlayers && newEpisode.players[0]) {
      episodeUrl = newEpisode.players[0].videos[0]?.video_url || null;
    }

    playerState((prevState) => ({
      ...prevState,
      episodeUrl: episodeUrl || '',
      episodeENTitle: newEpisode.title?.en || '',
      episodeTitle: newEpisode.title?.ua || '',
      episodeJPTitle: newEpisode.title?.jp || '',
      studiosList: studios,
      playerLoad: false,
    }));
  } catch (error) {
    console.error('Error fetching episode data:', error);
    playerState((prevState) => ({ ...prevState, isPlayerLoading: false }));
  }
}

export default handleEpisode;
