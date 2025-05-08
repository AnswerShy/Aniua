'use client';

import { useAnimeFilters } from '@/hooks/useFilter';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import styles from './filter.module.css';
import { Checkbox } from '@/components/UI/UIComponents';
import debounce from 'lodash.debounce';

function Filters() {
  const { filters } = useAnimeFilters();
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [hydrate, setHydrate] = useState(false);
  const router = useRouter();
  const params = new URLSearchParams();

  const urlUpdate = () => {
    Object.entries(selected).forEach(([key, values]) => {
      if (key == 'year') {
        return;
      }
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

    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    if (!hydrate) return;
    urlUpdate();
  }, [selected]);

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

  const doChange = (key: string, value: string) => {
    const current = selected[key] || [];
    const exists = current.includes(value);
    const updated = exists ? current.filter((v) => v !== value) : [...current, value];
    const newSelected = { ...selected, [key]: updated };
    setSelected(newSelected);
    setHydrate(true);
  };

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

  return (
    <nav className={styles.filterBlock}>
      {Object.entries(filters ?? {}).map(([key, value]) => {
        return (
          <div key={key} className="flex flex-col gap-2">
            <label>{key}</label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(value).map((item, index) => {
                const value = item[1];
                if (key == 'year' && typeof value === 'string') {
                  return (
                    <input
                      key={`year:${index}`}
                      type="number"
                      className={styles.range}
                      onChange={(e) => doChangeRange(key, e.target.value, index)}
                      placeholder={value}
                      min={filters?.['year']?.[0]}
                      max={filters?.['year']?.[1]}
                    ></input>
                  );
                }
                if (isFilterItem(value)) {
                  return (
                    <Checkbox
                      key={`${key}:${value.title}`}
                      title={value.title}
                      onChange={() => doChange(key, value.id)}
                      checked={selected[key]?.includes(value.id)}
                    />
                  );
                }
                if (typeof value === 'string') {
                  return (
                    <Checkbox
                      key={`${key}:${value}`}
                      title={value}
                      onChange={() => doChange(key, value)}
                      checked={selected[key]?.includes(value)}
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );
}

type FilterItem = { id: string; title: string };

function isFilterItem(obj: unknown): obj is FilterItem {
  if (typeof obj === 'object' && obj !== null) {
    const maybeItem = obj as { id?: unknown; title?: unknown };
    return typeof maybeItem.id === 'string' && typeof maybeItem.title === 'string';
  }
  return false;
}

export default Filters;
