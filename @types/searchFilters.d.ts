interface YearRange {
  min: number;
  max: number;
}

interface AnimeFiltersInterface {
  genre: AnimeGenres[];
  type: string[];
  status: string[];
  year: YearRange;
}
