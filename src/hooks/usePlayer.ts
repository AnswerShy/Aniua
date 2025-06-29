import { handleEpisode, getTranslatedText } from '@/utils';
import FetchServiceInstance from '@/app/api';
import { useCallback, useEffect, useState } from 'react';
import { usePlayerStore } from '@/stores/playerHistory';
import { animeAPIConstant } from '@/constants/api-endpoints.constant';

export const usePlayer = (slug: string | null) => {
  const [episodesList, setEpisodesList] = useState<EpisodeListInterface[] | null>(null);

  const [playerState, setPlayerState] = useState<playerStateInterface>({
    animeSlug: slug || '',
    episodeID: 0,
    chooseStudio: 0,
    studiosList: [],
    episodeUrl: null,
    episodeENTitle: '',
    episodeTitle: '',
    episodeJPTitle: '',
    isPlayerLoading: true,
  });

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        if (!slug) return;
        const list = await FetchServiceInstance.fetchHelper(
          `api/${animeAPIConstant.episodeList(slug)}`,
          {
            to: 'self',
          },
        ).then((res) => res.episodes);
        setEpisodesList(list);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEpisodes();

    const { getEpisode } = usePlayerStore.getState();
    const lastEpisode = Number(getEpisode(slug || '')?.episodeID);
    const lastStudio = Number(getEpisode(slug || '')?.studio);
    if (lastEpisode) {
      setPlayerState((prev) => ({ ...prev, episodeID: lastEpisode, chooseStudio: lastStudio }));
    }
    console.log(lastEpisode, lastStudio);
  }, [slug]);

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
      console.log(playerState);
      handleEpisode({
        playerState: setPlayerState,
        id: playerState.episodeID || episodesList[0].id,
        studio: playerState.chooseStudio,
        episodesList: episodesList[0],
        animeSlug: playerState.animeSlug,
      });
    } else {
      if (!playerState.isPlayerLoading) {
        setPlayerState((prevState) => ({
          ...prevState,
          episodeTitle: getTranslatedText('info.EpisodesNotFound'),
        }));
      }
    }
  }, [episodesList, playerState.chooseStudio]);

  return { playerState, setPlayerState, handleStudio, episodesList };
};
