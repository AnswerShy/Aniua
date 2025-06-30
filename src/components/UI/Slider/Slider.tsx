import React from 'react';

interface SliderProps {
  children: React.ReactNode;
}

function Slider({ children }: SliderProps) {
  return (
    <div className="w-full overflow-x-scroll overflow-y-hidden flex flex-row gap-2">{children}</div>
  );
}

export default Slider;
