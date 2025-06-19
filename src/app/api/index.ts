class AnimeService {
  private domain = process.env.NEXT_PUBLIC_BASE_URL;
  private api = process.env.NEXT_PUBLIC_API_URL;
  private search = process.env.NEXT_PUBLIC_SEARCH_API_URL;

  constructor() {
    if (!this.api || !this.domain) {
      console.warn('Missing environment variables: NEXT_PUBLIC_API_URL or NEXT_PUBLIC_BASE_URL');
    }
  }

  private constructUrl(endpoint: string, params?: Record<string, string>) {
    if (!this.domain) throw new Error('Base URL is undefined');
    const url = new URL(endpoint);
    if (params)
      Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
    console.log(`\x1b[32m ${url.toString()} \x1b[0m`);
    return url.toString();
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
      params,
      method = 'GET',
      body = null,
      chache,
      requestReturn = false,
    }: {
      to?: 'self' | 'out' | 'search';
      params?: Record<string, string>;
      method?: 'GET' | 'POST';
      body?: Record<string, string | number> | null;
      chache?: RequestCache;
      requestReturn?: boolean;
    } = {},
  ) {
    const baseURLMap: Record<'self' | 'out' | 'search', string | undefined> = {
      self: this.domain,
      out: this.api,
      search: this.search,
    };

    const baseURL = baseURLMap[to ?? 'self'];
    if (!baseURL) throw new Error(`Base URL for '${to}' is not defined`);

    const url = this.constructUrl(`${baseURL}${endpoint}`, params);

    try {
      const options = this.getFetchOptions(method, body, chache);

      const request = await fetch(url, options);

      if (!request.ok) {
        return { error: true, status: request.status, response: await request.json() };
      }

      return requestReturn ? request : await request.json();
    } catch (error) {
      console.error(`Error fetching ${url}\n<${baseURL}---${endpoint}>: ${error}`);
      return null;
    }
  }
}

const FetchServiceInstance = new AnimeService();
export default FetchServiceInstance;
