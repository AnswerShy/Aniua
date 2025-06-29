type Title = {
  genres: AnimeGenres[];
};

const chartDataExtractor = (titles: Title[]): chartData[] => {
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

export default chartDataExtractor;
