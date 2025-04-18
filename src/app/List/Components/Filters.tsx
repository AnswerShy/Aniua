'use client';

import { useAnimeFilters } from '@/hooks/useFilter';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const groupStyle = 'max-w-[250px] w-full';

function Filters() {
  const { filters } = useAnimeFilters();
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [ranges, setRanges] = useState<Record<string, { min: string; max: string }>>({});
  const router = useRouter();
  const params = new URLSearchParams();

  const toggleCheckbox = (key: string, value: string) => {
    console.log(key, value);
    setSelected((prev) => {
      const current = prev[key] || [];
      const exists = current.includes(value);
      const updated = exists ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [key]: updated };
    });
  };

  const doCheckboxes = (key: string, value: AnimeGenres[] | string) => {
    if (Array.isArray(value)) {
      return value.map((e) => {
        const id = e.id?.toString() || e.slug || e.title;
        return (
          <label key={e.slug} className="flex flex-row gap-2 capitalize">
            <input
              type="checkbox"
              checked={selected[key]?.includes(id)}
              onChange={() => toggleCheckbox(key, id)}
            />
            {e.title || e.toString()}
          </label>
        );
      });
    }
  };

  const updateRange = (key: string, type: 'min' | 'max', value: string) => {
    setRanges((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [type]: value,
      },
    }));
  };

  const doRange = (key: string, value: { min: number; max: number }) => {
    return (
      <div className="flex gap-2 items-center">
        <input
          type="number"
          className="w-20 px-2 py-1 border rounded"
          min={value.min}
          max={value.max}
          placeholder={String(value.min)}
          value={ranges[key]?.min ?? ''}
          onChange={(e) => updateRange(key, 'min', e.target.value)}
        />
        <span> - </span>
        <input
          type="number"
          className="w-20 px-2 py-1 border rounded"
          min={value.min}
          max={value.max}
          placeholder={String(value.max)}
          value={ranges[key]?.max ?? ''}
          onChange={(e) => updateRange(key, 'max', e.target.value)}
        />
      </div>
    );
  };

  useEffect(() => {
    Object.entries(selected).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.join(','));
      }
    });

    Object.entries(ranges).forEach(([key, { min, max }]) => {
      const minNum = Number(min);
      const maxNum = Number(max);

      if (!isNaN(minNum)) params.set(`${key}`, String(minNum));
      if (!isNaN(maxNum)) params.set(`${key}`, String(maxNum));

      if (!isNaN(minNum) && !isNaN(maxNum) && minNum <= maxNum) {
        params.set('year', `${minNum}-${maxNum}`);
      }
    });

    router.push(`?${params.toString()}`);
  }, [selected, ranges]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialSelected: Record<string, string[]> = {};
    const initialRanges: Record<string, { min: string; max: string }> = {};

    for (const [key, value] of params.entries()) {
      if (key === 'year') {
        const [min, max] = value.split('-');
        initialRanges['year'] = {
          min: min || '',
          max: max || '',
        };
      } else if (value.includes(',')) {
        initialSelected[key] = value.split(',');
      } else {
        initialSelected[key] = [value];
      }
    }

    setSelected(initialSelected);
    setRanges(initialRanges);
  }, []);

  return (
    <nav className={groupStyle}>
      {Object.entries(filters ?? {}).map(([key, value]) => {
        if (Array.isArray(value)) {
          return (
            <div key={key} className="mb-4">
              <label className="block font-semibold capitalize mb-1">{key}</label>
              <div className="flex flex-col gap-1">{doCheckboxes(key, value)}</div>
            </div>
          );
        }
        if (typeof value === 'object' && 'min' in value && 'max' in value) {
          return (
            <div key={key} className="mb-4">
              <label className="block font-semibold capitalize mb-1">{key}</label>
              {doRange(key, value)}
            </div>
          );
        }
      })}
    </nav>
  );
}

export default Filters;
