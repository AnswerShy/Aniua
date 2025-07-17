import React from 'react';
import styles from './Popover.module.css';

interface PopoverInterface {
  children?: React.ReactNode;
}

interface PopoverRowInterface {
  children?: React.ReactNode;
  variant?: 'title' | 'row';
}

const Popover = ({ children }: PopoverInterface) => {
  return <div className={styles.popoverCard}>{children}</div>;
};

const PopoverRow = ({ children, variant }: PopoverRowInterface) => {
  return <div className={styles[`popover-${variant}`]}>{children}</div>;
};

Popover.Row = PopoverRow;

export default Popover;
