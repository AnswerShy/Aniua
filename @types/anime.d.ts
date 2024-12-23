interface animeInformationInterface {
  poster: string;
  title: string;
  year: number;
  genres: [{ title: string; slug: string }];
  description: string;
  episode: { present: number; last: number };
  mal_score: number;
  type: { title: string };
  status: string;
  studio: string;
}

interface animeCardInterface {
  id: number;
  title: string;
  episode: { present: number; last: number };
  poster: string;
  status: string;
  slug: string;
}
