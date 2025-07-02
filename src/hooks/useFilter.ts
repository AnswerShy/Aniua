import FetchServiceInstance from '@/app/api';
import { initAnimeFilters } from '@/constants/anime-default-filters';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export const useAnimeFilters = () => {
  const [filters, setFilters] = useState<animeFilterConstant | null>(null);
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const router = useRouter();

  /* 
    fetch all filters data and setting options
  */
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

        const updatedConfig = {
          ...initAnimeFilters,
          genre: {
            ...initAnimeFilters.genre,
            values: genre,
          },
        };

        setFilters(updatedConfig);
      } catch (err) {
        console.error('Failed to fetch genres:', err);
      }
    };

    fetchGenres();
  }, []);

  /* 
    set filter options TO URL 
  */
  const updateUrl = useCallback(
    debounce(() => {
      const params = new URLSearchParams(); // create fresh here every time

      Object.entries(selected).forEach(([key, values]) => {
        if (key === 'year') return;
        if (values.length > 0) {
          params.set(key, values.join(','));
        }
      });

      const yearMin = Number(selected['year']?.[0]);
      const yearMax = Number(selected['year']?.[1]);

      if (yearMax && !yearMin) {
        params.set('year', `${yearMax}`);
      } else if (!yearMax && yearMin) {
        params.set('year', `${yearMin}`);
      } else if (yearMax && yearMin) {
        params.set('year', `${yearMin}-${yearMax}`);
      }

      router.replace(`?${params.toString()}`);
    }, 1000),
    [selected],
  );

  useEffect(() => {
    updateUrl();
    return () => {
      updateUrl.cancel();
    };
  }, [selected, updateUrl]);

  /* 
    set filter options FROM URL 
  */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialSelected: Record<string, string[]> = {};

    for (const [key, value] of params.entries()) {
      if (key === 'year') {
        const [min, max] = value.split('-');
        initialSelected['year'] = [min || '', max || ''];
      } else if (value.includes(',')) {
        initialSelected[key] = value.split(',');
      } else {
        initialSelected[key] = [value];
      }
    }
    setSelected(initialSelected);
  }, []);

  /* 
    set new filter option by provide key: value 
  */
  const doChange = (key: string, value: string) => {
    const current = selected[key] || [];
    const exists = current.includes(value);
    const updated = exists ? current.filter((v) => v !== value) : [...current, value];
    const newSelected = { ...selected, [key]: updated };
    setSelected(newSelected);
  };

  /* 
    set new filter option by range 
  */
  const doChangeRange = debounce((key: string, value: string, index: number) => {
    const current = selected[key] || ['', ''];
    const updated = [...current];
    updated[index] = value;

    const newSelected = {
      ...selected,
      [key]: updated,
    };

    setSelected(newSelected);
  }, 500);

  return { filters, selected, doChange, doChangeRange };
};
