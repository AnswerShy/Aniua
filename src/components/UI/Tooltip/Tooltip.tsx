import React, { useState } from 'react';
import styles from './Tooltip.module.css';
import clsx from 'clsx';

interface TooltipInterface extends React.HTMLAttributes<HTMLDivElement> {
  tooltipContent: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'left' | 'right';
}

const Tooltip = ({ tooltipContent, children, position = 'right', ...props }: TooltipInterface) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      {...props}
      className={styles['tooltip-wrapper']}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      <div
        className={clsx(
          styles.tooltip,
          styles[`tooltip-${position}`],
          isHovered ? styles.visible : styles.hidden,
        )}
      >
        <div className={styles['tooltip-content']}>{tooltipContent}</div>
      </div>
    </div>
  );
};

export default Tooltip;
