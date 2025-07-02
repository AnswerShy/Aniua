interface filterConfigInterface {
  type_of_filter: 'range' | 'option';
  minValue?: number;
  maxValue?: number;
  values?: string[] | AnimeGenres[];
}

type animeFilterConstant = Record<string, filterConfigInterface>;
