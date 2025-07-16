'use client';
import React, { useRef, useState } from 'react';
import styles from './range.module.css';
import { RangeContext } from './RangeContext';
import Thumb from './Thumb';

interface RangeInterface {
  children: React.ReactNode;
  minValue: number;
  maxValue: number;
  value?: number[];
}

function Range({ children, minValue = 1980, maxValue = 2025, value }: RangeInterface) {
  const rangeRef = useRef<HTMLLabelElement>(null);
  const [range, setRange] = useState<number[]>(value || [1980, 2025]);

  const getPercent = (year: number) => ((year - minValue) / (maxValue - minValue)) * 100;
  const getYearFromPosition = (x: number) => {
    const width = rangeRef.current?.offsetWidth || 0;
    const clamped = Math.min(Math.max(x, 0), width);
    const percent = clamped / width;
    const rawYear = minValue + percent * (maxValue - minValue);
    return Math.round(rawYear);
  };

  return (
    <RangeContext.Provider
      value={{ rangeRef, value: range, setValue: setRange, getPercent, getYearFromPosition }}
    >
      <label className={styles.rangeWrap} ref={rangeRef}>
        <span className={styles.track}></span>
        <span
          className={styles.filled}
          style={{
            left: `${getPercent(range[0])}%`,
            width: `${getPercent(range[1]) - getPercent(range[0])}%`,
          }}
        ></span>
        {children}
      </label>
    </RangeContext.Provider>
  );
}

Range.Thumb = Thumb;

export default Range;
