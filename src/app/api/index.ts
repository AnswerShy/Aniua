class AnimeService {
  async fetchAnimeInfo(slug: string): Promise<animeInformationInterface> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/anime/${slug}`,
      {
        method: 'GET',
        cache: 'force-cache',
        next: {
          revalidate: 3600,
        },
      },
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    return res.json();
  }

  async fetchEpisodeList(slug: string) {
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/anime/episodeList?title=${slug}`,
    );
    if (!request.ok) {
      throw new Error(`Failed to fetch: ${request.status}`);
    }
    const result = await request.json();
    return result.episodes;
  }

  async fetchEpisode(id: number) {
    console.log(id);
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/anime/episode?title=${id}`,
    );
    if (!request.ok) {
      throw new Error(`Failed to fetch: ${request.status}`);
    }
    const result = await request.json();
    return result.players;
  }

  async fetchAnimeList(page: number = 1): Promise<Array<animeCardInterface>> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/list?page=${page}`,
      {
        method: 'GET',
        cache: 'force-cache',
        next: {
          revalidate: 3600,
        },
      },
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    const finalRes = await res.json();
    return finalRes as animeCardInterface[];
  }

  async fetchCommunityChoice(): Promise<Array<animeCardInterface>> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/list?limit=5&order=rating`,
      {
        method: 'GET',
        cache: 'force-cache',
        next: {
          revalidate: 3600,
        },
      },
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    const finalRes = await res.json();
    return finalRes as animeCardInterface[];
  }
}

const AnimeServiceInstance = new AnimeService();
export default AnimeServiceInstance;
