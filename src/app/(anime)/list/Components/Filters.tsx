'use client';

import { useAnimeFilters } from '@/hooks/useFilter';
import React from 'react';

import styles from './filter.module.css';
import { Checkbox } from '@/components/UI/UIComponents';
import { getTranslatedText } from '@/utils';

function Filters() {
  const { filters, selected, doChange, doChangeRange } = useAnimeFilters();
  return (
    <nav className={styles.filterBlock}>
      {Object.entries(filters ?? {}).map(([key, value]) => {
        return (
          <FilterBlock label={getTranslatedText(`filters.${key}`)} key={key}>
            {value.type_of_filter == 'option' ? (
              <>
                {(value.values ?? []).map((e: string | AnimeGenres) => {
                  const id = typeof e === 'string' ? e : e.id;
                  const title = typeof e === 'string' ? e : e.title;
                  return (
                    <Checkbox
                      key={`${key}:${id}`}
                      title={title}
                      onChange={() => doChange(key, id.toString())}
                      checked={selected[key]?.includes(id.toString())}
                    />
                  );
                })}
              </>
            ) : (
              <>
                <div className={styles.range}>
                  <input
                    key={`${key}:min`}
                    type="number"
                    className={styles.range}
                    onChange={(e) => doChangeRange(key, e.target.value, 0)}
                    placeholder={String(value.minValue)}
                    min={value.minValue ?? 0}
                    max={value.maxValue ?? 2000}
                    value={selected[`${key}:min`]}
                  />
                  <input
                    key={`${key}:max`}
                    type="number"
                    className={styles.range}
                    onChange={(e) => doChangeRange(key, e.target.value, 1)}
                    placeholder={String(value.maxValue)}
                    min={value.minValue}
                    max={value.maxValue}
                    value={selected[`${key}:max`]}
                  />
                </div>
              </>
            )}
          </FilterBlock>
        );
      })}
    </nav>
  );
}

const FilterBlock = ({ label, children }: { label: string; children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
};

export default Filters;
