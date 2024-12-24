import { handleEpisode } from '@/utils/customUtils';
import AnimeServiceInstance from '@/app/api';
import { useCallback, useEffect, useState } from 'react';

export const usePlayer = (slug: string) => {
  const [episodesList, setEpisodesList] = useState<EpisodeListInterface[] | null>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const list = await AnimeServiceInstance.fetchEpisodeList(slug);
      setEpisodesList(list);
    };
    fetchEpisodes();
  }, [slug]);

  const [playerState, setPlayerState] = useState<playerStateInterface>({
    chooseStudio: 0,
    studiosList: [],
    episodeUrl: null,
    episodeTitle: '',
    episodeJPTitle: '',
    isPlayerLoading: false,
  });

  const handleStudio = useCallback((index: number) => {
    setPlayerState((prevState) => ({ ...prevState, chooseStudio: index }));
  }, []);

  useEffect(() => {
    setPlayerState((prevState) => ({ ...prevState, isPlayerLoading: false }));
  }, [playerState.episodeUrl]);

  useEffect(() => {
    if (episodesList?.[0]?.id) {
      setPlayerState((prevState) => ({ ...prevState, studiosList: [] }));
      handleEpisode(setPlayerState, episodesList[0].id, episodesList[0]);
    } else {
      setPlayerState((prevState) => ({
        ...prevState,
        episodeTitle: 'Any player founded',
      }));
    }
  }, [episodesList]);

  return { playerState, setPlayerState, handleStudio, episodesList };
};
