class AnimeService {
  private domain = process.env.NEXT_PUBLIC_BASE_URL;
  private api = process.env.NEXT_PUBLIC_API_URL;

  private getFetchOptions(method: string = 'GET', cache: RequestCache = 'force-cache'): RequestInit {
    return {
      method,
      cache,
      next: {
        revalidate: 3600,
      },
    };
  }

  async fetchAnimeInfo(slug: string): Promise<AnimeDataInterface> {
    const res = await fetch(`${this.domain}anime/${slug}`, this.getFetchOptions());
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    return res.json();
  }

  async fetchEpisodeList(slug: string) {
    const request = await fetch(`${this.domain}/api/anime/episodeList?title=${slug}`, this.getFetchOptions());
    if (!request.ok) {
      throw new Error(`Failed to fetch: ${request.status}`);
    }
    const result = await request.json();
    return result.episodes;
  }

  async fetchEpisode(id: number) {
    const request = await fetch(`${this.domain}/api/anime/episode?title=${id}`, this.getFetchOptions());
    if (!request.ok) {
      throw new Error(`Failed to fetch: ${request.status}`);
    }
    const result = await request.json();
    return result.players;
  }

  async fetchAnimeList(page: number = 1): Promise<Array<AnimeDataInterface>> {
    const res = await fetch(`${this.api}filter/?page=${page}&limit=18`, this.getFetchOptions());
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    const finalRes = await res.json();
    return finalRes.titles as AnimeDataInterface[];
  }

  async fetchCommunityChoice(): Promise<Array<AnimeDataInterface>> {
    const res = await fetch(`${this.api}filter/?limit=5&order=rating`, this.getFetchOptions());
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    const finalRes = await res.json();
    return finalRes.titles as AnimeDataInterface[];
  }

  async fetchUserListContent() {
    const request = await fetch(`${this.domain}/api/chart`, this.getFetchOptions());
    if (!request.ok) {
      throw new Error(`Failed to fetch: ${request.status}`);
    }
    const finalRequest = await request.json();

    const finalResponse = chartDataExtractor(finalRequest.titles);
    return finalResponse;
  }
}

type Title = {
  genres: AnimeGenres[];
};

export const chartDataExtractor = (titles: Title[]): chartData[] => {
  if (!Array.isArray(titles)) {
    console.error('Invalid input: titles is not an array', titles);
    return [];
  }

  const genreCount: Record<string, number> = {};

  titles.forEach((title) => {
    if (Array.isArray(title.genres)) {
      title.genres.forEach((genre: { title: string }) => {
        if (genreCount[genre.title]) {
          genreCount[genre.title]++;
        } else {
          genreCount[genre.title] = 1;
        }
      });
    } else {
      console.warn('Invalid genres structure in title:', title);
    }
  });

  const chartData = Object.entries(genreCount).map(([genre, count]) => ({
    id: genre,
    value: count,
    label: genre,
  }));

  return chartData;
};

const AnimeServiceInstance = new AnimeService();
export default AnimeServiceInstance;
