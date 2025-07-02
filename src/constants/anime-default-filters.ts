export const initAnimeFilters: animeFilterConstant = {
  year: {
    type_of_filter: 'range',
    minValue: 1980,
    maxValue: 2025,
  },
  genre: {
    type_of_filter: 'option',
    values: [],
  },
  type: {
    type_of_filter: 'option',
    values: ['tv', 'movie'],
  },
  status: {
    type_of_filter: 'option',
    values: ['ongoing', 'finished'],
  },
  season_anime: {
    type_of_filter: 'option',
    values: ['winter', 'spring', 'summer', 'autumn'],
  },
};
