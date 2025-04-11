import React from 'react';
import styles from './RowAndSubrow.module.css';

const Row: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={styles.row}>{children}</div>;
};

export default Row;
