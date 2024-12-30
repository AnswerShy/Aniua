// Desc: Helper function to handle the episode change in the player component
import AnimeServiceInstance from '@/app/api';
import { Dispatch, SetStateAction } from 'react';

interface handeEpisodeInterface {
  playerState: Dispatch<SetStateAction<playerStateInterface>>;
  id: number;
  studio?: number;
  episodesList: EpisodeListInterface;
}

async function handleEpisode({playerState, id, studio = 0, episodesList}: handeEpisodeInterface) {
  playerState((prevState) => ({ ...prevState, isPlayerLoading: true }));
  try {
    const newEpisode = await AnimeServiceInstance.fetchEpisode(id);
    const studios: string[] = newEpisode.players.map((player: PlayersInEpisode) => player.studio);;
    const episodeUrl: string | null = newEpisode.players[studio].videos[0].video_url;

    playerState((prevState) => ({
      ...prevState,
      episodeUrl: episodeUrl || '',
      episodeTitle: episodesList.title.ua,
      episodeJPTitle: episodesList.title.jp,
      studiosList: studios,
      playerLoad: false,
    }));
  } catch (error) {
    console.error("Error fetching episode data:", error);
    playerState((prevState) => ({ ...prevState, isPlayerLoading: false }));
  }
}

export default handleEpisode;
