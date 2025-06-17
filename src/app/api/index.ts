import { LoginRequest, RegistrationRequest } from '@/interfaces/UserAccServices';
import { i18n } from '@/utils/customUtils';
import { NextRequest, NextResponse } from 'next/server';
import toast from 'react-hot-toast';

class AnimeService {
  private domain = process.env.NEXT_PUBLIC_BASE_URL;
  private api = process.env.NEXT_PUBLIC_API_URL;

  private constructUrl(endpoint: string, params?: Record<string, string>) {
    const url = new URL(endpoint, this.domain);
    if (params)
      Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
    return url.toString();
  }

  private async getCookieHeader(req: NextRequest): Promise<string | NextResponse> {
    const sessionid = req.cookies.get('sessionid')?.value;
    if (!sessionid)
      return NextResponse.json({ message: 'Missing required cookies' }, { status: 400 });
    return `sessionid=${sessionid}`;
  }

  private getFetchOptions<T>(
    method: 'GET' | 'POST' = 'GET',
    body: T | null = null,
    cache: RequestCache = 'force-cache',
  ): RequestInit {
    const options: RequestInit = {
      method,
      cache,
      next: {
        revalidate: 1000 * 60 * 5,
      },
    };

    if (cache == 'no-store') {
      options.next = {};
    }

    if (method === 'POST' && body) {
      options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      const formData = new URLSearchParams();
      Object.entries(body).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      formData.toString();
      options.body = formData;

      console.log(options.body);
    }

    return options;
  }

  async fetchHelper(
    endpoint: string,
    {
      to,
      req,
      params,
      method = 'GET',
      body = null,
      chache,
    }: {
      to?: 'self' | 'out';
      req?: NextRequest;
      params?: Record<string, string>;
      method?: 'GET' | 'POST';
      body?: Record<string, string | number> | null;
      chache?: RequestCache;
    } = {},
  ) {
    try {
      const url = this.constructUrl(
        `${to ? (to === 'self' ? this.domain : this.api) : ''}${endpoint}`,
        params,
      );

      const options = this.getFetchOptions(method, body, chache);

      if (req) {
        const cookieHeader = await this.getCookieHeader(req);
        if (cookieHeader) {
          options.headers = {
            ...(options.headers || {}),
            Cookie: cookieHeader as string,
          };
        }
      }
      console.log(url);
      const request = await fetch(url, options);
      const response = await request.json();
      if (!request.ok) throw new Error(`${request.status} ${response.message}`);
      return response;
    } catch (error) {
      const totalEndpoint = `${to ? (to === 'self' ? this.domain : this.api) : ''}${endpoint}`;
      console.error(`Error fetching ${totalEndpoint}: ${error}`);
      return null;
    }
  }

  // Ready fetches

  async fetchAnimeInfo(slug: string): Promise<AnimeDataInterface> {
    return this.fetchHelper(`api/anime/${slug}`, { to: 'self' });
  }

  async fetchEpisodeList(slug: string) {
    return await this.fetchHelper(`api/anime/episodeList?title=${slug}`, { to: 'self' }).then(
      (res) => res.episodes,
    );
  }

  async fetchEpisode(id: number) {
    return this.fetchHelper(`api/anime/episode?title=${id}`, { to: 'self' });
  }

  async fetchAnimeList(
    page: number = 1,
    filter?: string,
  ): Promise<{ page_count: number; titles: AnimeDataInterface[] }> {
    const filterData = filter?.toString();
    return this.fetchHelper(`api/list/?page=${page}&limit=28&${filterData}`, {
      to: 'self',
      chache: 'no-store',
    }).then((res) => res as { page_count: number; titles: AnimeDataInterface[] });
  }

  async fetchCommunityChoice(): Promise<Array<AnimeDataInterface>> {
    return this.fetchHelper(`filter/?limit=5&order=rating`, { to: 'out' }).then(
      (res) => res.titles as AnimeDataInterface[],
    );
  }

  async fetchUserListContent() {
    return this.fetchHelper(`api/chart`, { to: 'self', method: 'GET', chache: 'no-store' }).then(
      (res) => chartDataExtractor(res),
    );
  }

  async fetchProfile() {
    return this.fetchHelper(`api/profile`, {
      to: 'self',
      method: 'GET',
      chache: 'no-store',
    }).then((res) => {
      if (res == null) {
        localStorage.setItem('isLoggedIn', 'false');
      }
      return res;
    });
  }

  async fetchLogin(data: LoginRequest): Promise<{ success: boolean }> {
    try {
      const res = await this.fetchHelper(`api/login`, {
        to: 'self',
        method: 'POST',
        body: {
          username: data.username,
          password: data.password,
        },
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

  async fetchRegistration(data: RegistrationRequest): Promise<{ success: boolean }> {
    try {
      const res = await this.fetchHelper(`api/registration`, {
        to: 'self',
        method: 'POST',
        body: {
          username: data.username,
          email: data.email,
          password1: data.password1,
          password2: data.password2,
        },
      });

      if (res?.success == true) {
        return res;
      } else {
        toast.error(i18n.t('toast.RegistrationFailedUser'));
        console.error(i18n.t('toast.RegistrationFailedUser'));
        return { success: false };
      }
    } catch (error) {
      toast.error(i18n.t('toast.fetchRegistrationError'));
      console.error(i18n.t('toast.fetchRegistrationError'), error);
      return { success: false };
    }
  }
}

type Title = {
  genres: AnimeGenres[];
};

export const chartDataExtractor = (titles: Title[]): chartData[] => {
  if (!Array.isArray(titles)) {
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

const FetchServiceInstance = new AnimeService();
export default FetchServiceInstance;
