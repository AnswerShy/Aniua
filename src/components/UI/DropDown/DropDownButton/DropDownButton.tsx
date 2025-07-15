import React, { HTMLAttributes } from 'react';
import styles from './dropdownButton.module.css';
import { ArrowDownIcon } from '@/utils/icons';

interface dropdown_button extends HTMLAttributes<HTMLDivElement> {
  state: string | React.ReactNode;
  handle: () => void;
}

function DropDownButton({ state, handle }: dropdown_button) {
  return (
    <>
      <div className={styles.dropdownButton} onClick={() => handle}>
        {typeof state == 'string' ? (
          <>
            <label>{state}</label>
            <ArrowDownIcon />
          </>
        ) : (
          state
        )}
      </div>
    </>
  );
}

export default DropDownButton;
