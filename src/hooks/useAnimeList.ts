import FetchServiceInstance from '@/app/api';
import { animeAPIConstant } from '@/constants/api-endpoints.constant';
import { useEffect, useState } from 'react';

const useAnimeList = (
  queryString: Record<string, string>,
  addition?: { limit?: string; initialData?: AnimeDataInterface[] },
) => {
  const [anime, setAnime] = useState<AnimeDataInterface[]>(addition?.initialData || []);
  const [isEnd, setEnd] = useState(false);
  const [isLoad, setLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [listLength, setLength] = useState(0);

  const fetchMore = async () => {
    try {
      setLoad(true);
      console.log(queryString);
      const moreAnime = (await FetchServiceInstance.fetchHelper(animeAPIConstant['list'], {
        params: {
          page: page.toString(),
          limit: addition?.limit || '15',
          ...queryString,
        },
        to: 'self',
        cache: 'no-store',
      })) as { page_count: number; titles: AnimeDataInterface[] };
      setAnime([...moreAnime.titles]);

      setLength(moreAnime.page_count);
      if (moreAnime.titles.length < 18) {
        setEnd(true);
      } else {
        setEnd(false);
      }
      setLoad(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMore();
  }, [page, queryString]);

  const handleLeft = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleRight = () => {
    setPage((prev) => prev + 1);
  };

  return { handleLeft, handleRight, anime, isEnd, isLoad, listLength, page, setPage };
};

export default useAnimeList;
