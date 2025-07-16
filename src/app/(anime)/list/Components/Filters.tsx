'use client';

import { useAnimeFilters } from '@/hooks/useFilter';
import React from 'react';

import styles from './filter.module.css';
import { Checkbox, Collapsible, Range } from '@/components/UI/UIComponents';
import { getTranslatedText } from '@/utils';

function Filters() {
  const { filters, selected, doChange, doChangeRange } = useAnimeFilters();
  console.log(selected);
  return (
    <>
      {Object.entries(filters ?? {}).map(([key, value], index) => {
        return (
          <Collapsible
            label={getTranslatedText(`filters.${key}`)}
            hidden={index < 2 ? true : false}
            key={key}
          >
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
                    value={selected[`${key}`]?.[0]}
                  />
                  <input
                    key={`${key}:max`}
                    type="number"
                    className={styles.range}
                    onChange={(e) => doChangeRange(key, e.target.value, 1)}
                    placeholder={String(value.maxValue)}
                    min={value.minValue}
                    max={value.maxValue}
                    value={selected[`${key}`]?.[1]}
                  />
                </div>
                <Range
                  minValue={value.minValue || 1980}
                  maxValue={value.maxValue || 2025}
                  value={[
                    Number(selected[`${key}`]?.[0] || value.minValue),
                    Number(selected[`${key}`]?.[1] || value.maxValue),
                  ]}
                >
                  <Range.Thumb
                    index={0}
                    onChange={(val) => doChangeRange(key, val.toString(), 0)}
                  />
                  <Range.Thumb
                    index={1}
                    onChange={(val) => doChangeRange(key, val.toString(), 1)}
                  />
                </Range>
              </>
            )}
          </Collapsible>
        );
      })}
    </>
  );
}

export default Filters;
