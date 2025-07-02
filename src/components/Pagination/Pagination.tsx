'use client';
import React, { useRef } from 'react';
import { CustomButton } from '../UI/UIComponents';

interface PagiProps {
  children: React.ReactNode;
  moveLeftFunc?: () => void;
  moveRightFunc?: () => void;
  isNextDisabled?: boolean;
  isPrevDisabled?: boolean;
}

function Pagination({
  children,
  moveLeftFunc,
  moveRightFunc,
  isPrevDisabled,
  isNextDisabled,
}: PagiProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollByAmount = 200;

  const handleScrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -scrollByAmount, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
  };

  return (
    <nav className="flex flex-row w-full items-center justify-center gap-2 px-2">
      <CustomButton
        variant="outline"
        onClick={moveLeftFunc || handleScrollLeft}
        disabled={isPrevDisabled}
      >
        ←
      </CustomButton>
      <div ref={scrollRef} className="max-w-full w-fit py-2 overflow-scroll flex flex-row gap-2">
        {children}
      </div>
      <CustomButton
        variant="outline"
        onClick={moveRightFunc || handleScrollRight}
        disabled={isNextDisabled}
      >
        →
      </CustomButton>
    </nav>
  );
}

export default Pagination;
