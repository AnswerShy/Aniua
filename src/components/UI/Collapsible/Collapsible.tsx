'use client';

import React, { useState } from 'react';
import styles from './Collapsible.module.css';
import clsx from 'clsx';
import { CustomButton } from '../UIComponents';
import { ArrowDownIcon } from '@/utils/icons';

function Collapsible({
  label,
  children,
  hidden,
}: {
  label: string;
  children: React.ReactNode;
  hidden?: boolean;
}) {
  const [visible, setVisible] = useState(hidden && true);
  const handleVisible = () => setVisible((prev) => !prev);

  return (
    <div
      className={styles.block}
      aria-haspopup="listbox"
      aria-expanded={visible}
      aria-controls="dropdown-options"
    >
      <CustomButton onClick={handleVisible} style={{ justifyContent: 'space-between' }}>
        {label}
        <ArrowDownIcon
          style={{ transform: `rotate(${visible ? `0deg` : `180deg`})`, transition: 'all .1s' }}
        />
      </CustomButton>
      <div
        className={clsx(
          'flex flex-wrap gap-2 transition-all overflow-clip justify-start w-full px-1',
          visible ? 'max-h-screen' : 'max-h-0',
        )}
        aria-expanded={visible}
        inert={!visible ? true : false}
      >
        {children}
      </div>
    </div>
  );
}

export default Collapsible;
