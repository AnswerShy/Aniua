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

  const handleStudio = useCallback(
    (index: number) => {
      setPlayerState((prevState) => ({ ...prevState, chooseStudio: index }));
      if (episodesList && episodesList[0]?.id) {
        handleEpisode({
          playerState: setPlayerState,
          id: episodesList[0].id,
          studio: index,
          episodesList: episodesList[0],
        });
      }
    },
    [episodesList]
  );

  useEffect(() => {
    setPlayerState((prevState) => ({ ...prevState, isPlayerLoading: false }));
  }, [playerState.episodeUrl]);

  useEffect(() => {
    if (episodesList?.[0]?.id) {
      setPlayerState((prevState) => ({ ...prevState, studiosList: [] }));
      handleEpisode({
        playerState: setPlayerState,
        id: episodesList[0].id,
        studio: playerState.chooseStudio,
        episodesList: episodesList[0],
      });
    } else {
      setPlayerState((prevState) => ({
        ...prevState,
        episodeTitle: 'No episodes found',
      }));
    }
  }, [episodesList, playerState.chooseStudio]);

  return { playerState, setPlayerState, handleStudio, episodesList };
};
