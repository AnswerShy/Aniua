interface AnimeEpisodes {
  present: null;
  last: number;
}

interface AnimeGenres {
  title: string;
  id: number;
  slug: string;
  title_en?: string;
  description?: string;
}

interface TitleSynonym {
  title: string;
  type: string;
}

interface AnimeDataInterface {
  id: number;
  title: string;
  title_en: string;
  title_jp: string;
  episode: AnimeEpisodes;
  title_synonyms: TitleSynonym[];
  poster: string;
  background_image_url: null;
  duration: string;
  genres: AnimeGenres[];
  year: number;
  type: { title: string; slug: string };
  status: string;
  season_anime: string;
  season_anime_num: string;
  slug: string;
  url: string;
  create_at: Date;
  update_at: Date;
  is_ongoing: boolean;
  age: string;
  score: number;
  score_count: number;
  mal_score: number;
  description: string;
}
