import FetchServiceInstance from '@/app/api';
import { useEffect, useState } from 'react';

export const useAnimeFilters = () => {
  const [filters, setFilters] = useState<AnimeFiltersInterface | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await FetchServiceInstance.fetchHelper('genres', { to: 'out' });

        const genre = res.genres.map((genre: AnimeGenres) => ({
          id: String(genre.id),
          title: genre.title,
          title_en: genre.title_en,
          slug: genre.slug,
        }));

        const defaultFilters: AnimeFiltersInterface = {
          year: ['1980', '2025'],
          genre,
          type: ['tv', 'movie'],
          status: ['ongoing', 'finished'],
        };

        setFilters(defaultFilters);
      } catch (err) {
        console.error('Failed to fetch genres:', err);
      }
    };

    fetchGenres();
  }, []);

  return { filters };
};
