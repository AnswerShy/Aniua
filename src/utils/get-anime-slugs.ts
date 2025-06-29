import FetchServiceInstance from '@/app/api';
import { animeAPIConstant } from '@/constants/api-endpoints.constant';
import { sleep } from '@/utils';

async function getAllAnimeSlugs(): Promise<string[]> {
  const allSlugs: string[] = [];
  let page = 1;
  const pageSize = 100;
  let hasMore = true;

  while (hasMore) {
    const response = await FetchServiceInstance.fetchHelper(animeAPIConstant['filter'], {
      to: 'out',
      params: { limit: String(pageSize), page: String(page), order: 'rating' },
    });

    const titles: AnimeDataInterface[] = response.titles;

    allSlugs.push(...titles.map((anime) => anime.slug));
    if (page < 3) {
      hasMore = false;
    } else {
      page++;
    }

    await sleep(1000);
  }
  return allSlugs;
}

export default getAllAnimeSlugs;
