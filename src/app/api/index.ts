import { LoginRequest } from '@/interfaces/UserAccServices';
import { i18n } from '@/utils/customUtils';
import { NextRequest, NextResponse } from 'next/server';
import toast from 'react-hot-toast';

class AnimeService {
  private domain = process.env.NEXT_PUBLIC_BASE_URL;
  private api = process.env.NEXT_PUBLIC_API_URL;

  private constructUrl(endpoint: string, params?: Record<string, string>) {
    const url = new URL(endpoint, this.domain);
    if (params) Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
    return url.toString();
  }

  private async getCookieHeader(req: NextRequest): Promise<string | NextResponse> {
    const sessionid = req.cookies.get('sessionid')?.value;
    if (!sessionid) return NextResponse.json({ message: 'Missing required cookies' }, { status: 400 });
    return `sessionid=${sessionid}`;
  }

  private getFetchOptions<T>(method: 'GET' | 'POST' = 'GET', body: T | null = null, cache: RequestCache = 'force-cache'): RequestInit {
    const options: RequestInit = {
      method,
      cache,
      next: {
        revalidate: 3600,
      },
    };

    if (method === 'POST' && body) {
      options.headers = {
        'Content-Type': 'application/json',
      };
      options.body = JSON.stringify(body);
    }

    return options;
  }

  private async fetchHelper(endpoint: string, req?: NextRequest, params?: Record<string, string>, method: 'GET' | 'POST' = 'GET', body: Record<string, string | number> | null = null, chache?: RequestCache) {
    try {
      const url = this.constructUrl(endpoint, params);
      const options = this.getFetchOptions(method, body, chache);

      if (req) {
        const cookieHeader = await this.getCookieHeader(req);
        if (cookieHeader instanceof NextResponse) return cookieHeader;

        options.headers = {
          ...(options.headers || {}),
          Cookie: cookieHeader,
        };
      }

      const request = await fetch(url, options);
      const response = await request.json();
      if (!request.ok) throw new Error(`${request.status} ${response.message}`);
      return response;
    } catch (error) {
      console.error(`Error fetching ${endpoint}: ${error}`);
      return null;
    }
  }

  async fetchAnimeInfo(slug: string): Promise<AnimeDataInterface> {
    return this.fetchHelper(`${this.domain}api/anime/${slug}`);
  }

  async fetchEpisodeList(slug: string) {
    return await this.fetchHelper(`${this.domain}api/anime/episodeList?title=${slug}`).then((res) => res.episodes);
  }

  async fetchEpisode(id: number) {
    return this.fetchHelper(`${this.domain}api/anime/episode?title=${id}`);
  }

  async fetchAnimeList(page: number = 1): Promise<Array<AnimeDataInterface>> {
    return this.fetchHelper(`${this.api}filter/?page=${page}&limit=18`).then((res) => res.titles as AnimeDataInterface[]);
  }

  async fetchCommunityChoice(): Promise<Array<AnimeDataInterface>> {
    return this.fetchHelper(`${this.api}filter/?limit=5&order=rating`).then((res) => res.titles as AnimeDataInterface[]);
  }

  async fetchUserListContent() {
    return this.fetchHelper(`${this.domain}api/chart`, undefined, undefined, 'GET', null, 'no-store').then((res) => chartDataExtractor(res));
  }

  async fetchProfile() {
    return this.fetchHelper(`${this.domain}api/profile`, undefined, undefined, 'GET', null, 'no-store').then((res) => res);
  }

  async fetchLogin(data: LoginRequest): Promise<{ success: boolean }> {
    try {
      const res = await this.fetchHelper(`/api/login`, undefined, undefined, 'POST', {
        username: data.username,
        password: data.password,
      });

      if (res?.success == true) {
        return res;
      } else {
        toast.error(i18n.t('toast.LoginFailedUser'));
        console.error(i18n.t('toast.LoginFailedUser'));
        return { success: false };
      }
    } catch (error) {
      toast.error(i18n.t('toast.fetchLoginError'));
      console.error(i18n.t('toast.fetchLoginError'), error);
      return { success: false };
    }
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
