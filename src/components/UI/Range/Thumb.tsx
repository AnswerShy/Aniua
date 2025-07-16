'use client';
import React from 'react';
import styles from './range.module.css';
import { useRangeContext } from './RangeContext';

interface ThumbProps {
  index: 0 | 1;
  onChange?: (newValue: number) => void;
}

const Thumb: React.FC<ThumbProps> = ({ index, onChange }) => {
  const { rangeRef, value, setValue, getPercent, getYearFromPosition } = useRangeContext();

  const startDragging = (e: React.MouseEvent) => {
    e.preventDefault();
    let lastYear = value[index];

    const onMouseMove = (event: MouseEvent) => {
      if (!rangeRef.current) return;
      const bounds = rangeRef.current.getBoundingClientRect();
      const relativeX = event.clientX - bounds.left;
      const newYear = getYearFromPosition(relativeX);

      if (newYear === lastYear) return;

      onChange?.(newYear);
      setValue((prev) => {
        const newRange = [...prev];
        newRange[index] = newYear;

        if (newRange[0] > newRange[1]) {
          if (index === 0) newRange[0] = newRange[1];
          else newRange[1] = newRange[0];
        }

        lastYear = newRange[index];
        return newRange;
      });
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <span
      onMouseDown={startDragging}
      className={styles.thumb}
      style={{ left: `${getPercent(value[index])}%` }}
    ></span>
  );
};

export default Thumb;
