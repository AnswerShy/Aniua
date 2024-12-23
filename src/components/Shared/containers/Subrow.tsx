import React from 'react';
import styles from './RowAndSubrow.module.css';

const SubRow: React.FC<{
  widthState?: '1/4' | '2/4' | '3/4' | '4/4';
  title: string;
  children: React.ReactNode;
}> = ({ widthState = '4/4', title, children }) => {
  const widthClasses: { [key: string]: string } = {
    '1/4': '25%',
    '2/4': '50%',
    '3/4': '75%',
    '4/4': '100%',
  };
  return (
    <div
      style={
        { '--subrow-width': widthClasses[widthState] } as React.CSSProperties
      }
      className={styles.subrowWrap}
    >
      <p className={styles.subrowTitle}>{title}</p>
      <div className={styles.subrowComponentsWrap}>{children}</div>
    </div>
  );
};

export default SubRow;
