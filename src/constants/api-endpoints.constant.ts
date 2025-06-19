export const userAPIConstant = {
  login: 'api/login',
  registration: 'api/registration',
  profile: `api/profile`,
  chart: `api/chart`,
};

export const animeAPIConstant = {
  list: `api/list/`,
  filter: `filter/`,
  episode: `api/anime/episode`,
  search: `search/`,
  episodeByTitle: (title: string) => `episode/get/${encodeURIComponent(title)}`,
  episodeList: (slug: string) => `anime/${encodeURIComponent(slug)}/episodes`,
  animeByTitle: (slug: string) => `anime/${encodeURIComponent(slug)}`,
};
