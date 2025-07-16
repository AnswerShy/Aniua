'use client';
import React from 'react';

export interface RangeContextType {
  rangeRef: React.RefObject<HTMLElement>;
  value: number[];
  setValue: React.Dispatch<React.SetStateAction<number[]>>;
  getPercent: (year: number) => number;
  getYearFromPosition: (x: number) => number;
}

export const RangeContext = React.createContext<RangeContextType | null>(null);

export const useRangeContext = () => {
  const context = React.useContext(RangeContext);
  if (!context) throw new Error('useRangeContext must be used within RangeProvider');
  return context;
};
