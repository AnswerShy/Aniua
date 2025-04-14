'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './CreepingText.module.css';

interface AnimatedTextProps {
  text: string | null;
  speed?: number;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  lineSpacing?: number;
}

const CreepingText: React.FC<AnimatedTextProps> = ({
  text,
  speed = 10,
  fontSize = 64,
  color = 'rgba(255, 255, 255, 0.01)',
  fontFamily = 'Roboto Condensed',
  lineSpacing = 100,
}) => {
  if (!text) return;
  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const [textImage, setTextImage] = useState('');

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = textRef.current.offsetWidth + lineSpacing / 2;
        canvas.height = fontSize + lineSpacing;

        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.fillStyle = color;
        ctx.textBaseline = 'top';
        ctx.fillText(text, 0, 0);

        setTextImage(canvas.toDataURL()); // Convert canvas to base64 image
      }
    }
  }, [text]);

  return (
    <div className={styles.tickerContainer}>
      {/* Hidden text for measurement */}
      <div
        ref={textRef}
        className="hidden-text"
        style={{
          fontSize,
          fontFamily,
          color,
          whiteSpace: 'nowrap',
          position: 'absolute',
          visibility: 'hidden',
        }}
      >
        {text}
      </div>
      {[0, 1].map((index) => (
        <div
          key={index}
          className={`${styles.tickerRow} ${index % 2 === 0 ? styles.tickerLeft : styles.tickerRight}`}
          style={
            {
              top: `${index * ((fontSize + lineSpacing) / 2)}px`,
              backgroundImage: `url("${textImage}")`,
              animationDuration: `${speed}s`,
              '--textWidth': `${textWidth + lineSpacing / 2}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default CreepingText;
