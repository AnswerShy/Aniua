import React from 'react';

interface SliderProps {
  children: React.ReactNode;
}

function Slider({ children }: SliderProps) {
  return (
    <div
      style={{
        width: '100%',
        overflow: 'scroll hidden',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {children}
    </div>
  );
}

export default Slider;
