import { handleEpisode, i18n } from '@/utils/customUtils';
import FetchServiceInstance from '@/app/api';
import { useCallback, useEffect, useState } from 'react';

export const usePlayer = (slug: string | null) => {
  const [episodesList, setEpisodesList] = useState<EpisodeListInterface[] | null>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!slug) return;
      const list = await FetchServiceInstance.fetchEpisodeList(slug);
      setEpisodesList(list);
    };
    fetchEpisodes();
  }, [slug]);

  const [playerState, setPlayerState] = useState<playerStateInterface>({
    episodeID: 0,
    chooseStudio: 0,
    studiosList: [],
    episodeUrl: null,
    episodeENTitle: '',
    episodeTitle: '',
    episodeJPTitle: '',
    isPlayerLoading: true,
  });

  const handleStudio = useCallback(
    (index: number) => {
      setPlayerState((prevState) => ({ ...prevState, chooseStudio: index }));
    },
    [episodesList],
  );

  useEffect(() => {
    setPlayerState((prevState) => ({ ...prevState, isPlayerLoading: false }));
  }, [playerState.episodeUrl]);

  useEffect(() => {
    if (episodesList?.[0]?.id) {
      setPlayerState((prevState) => ({ ...prevState, studiosList: [] }));
      handleEpisode({
        playerState: setPlayerState,
        id: playerState.episodeID || episodesList[0].id,
        studio: playerState.chooseStudio,
        episodesList: episodesList[0],
      });
    } else {
      if (!playerState.isPlayerLoading) {
        setPlayerState((prevState) => ({
          ...prevState,
          episodeTitle: i18n.t('info.EpisodesNotFound'),
        }));
      }
    }
  }, [episodesList, playerState.chooseStudio]);

  return { playerState, setPlayerState, handleStudio, episodesList };
};
