import FetchServiceInstance from '@/app/api';
import { animeAPIConstant } from '@/constants/api-endpoints.constant';

const useAnimeList = async (query: Record<string, string | string[] | undefined>) => {
  const result = (await FetchServiceInstance.fetchHelper(animeAPIConstant['list'], {
    params: { page: '1', limit: '15', ...query },
    to: 'self',
    cache: 'force-cache',
  })) as AnimeDataListInterface;

  const titles = result.titles;
  const isNextPage = result.next_page;
  const isPrevPage = result.previous_page;
  const page = result.page;
  const pageCount = result.page_count;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();

    for (const key in query) {
      const value = query[key];
      if (Array.isArray(value)) {
        value.forEach((v) => v && params.append(key, v));
      } else if (typeof value === 'string') {
        params.set(key, value);
      }
    }

    params.set('page', page.toString());

    return `?${params.toString()}`;
  };

  return { titles, isNextPage, isPrevPage, page, pageCount, createPageUrl };
};

export default useAnimeList;
