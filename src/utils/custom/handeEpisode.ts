// Desc: Helper function to handle the episode change in the player component
import AnimeServiceInstance from '@/app/api';
import { Dispatch, SetStateAction } from 'react';

async function handleEpisode(
  playerState: Dispatch<SetStateAction<playerStateInterface>>,
  id: number,
  episodesList: EpisodeListInterface,
) {
  playerState((prevState) => ({ ...prevState, playerLoad: true }));
  const newEpisode = await AnimeServiceInstance.fetchEpisode(id);
  playerState((prevState) => ({
    ...prevState,
    episodeUrl: newEpisode[0].videos[0].video_url,
    episodeTitle: episodesList.title.ua,
    episodeJPTitle: episodesList.title.jp,
    playerLoad: false,
  }));
}

export default handleEpisode;
