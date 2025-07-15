import React, { HTMLAttributes } from 'react';
import styles from './dropdownButton.module.css';
import { ArrowDownIcon } from '@/utils/icons';
import { CustomButton } from '../../UIComponents';

interface dropdown_button extends HTMLAttributes<HTMLDivElement> {
  state: string | React.ReactNode;
  handle: () => void;
}

function DropDownButton({ state, handle }: dropdown_button) {
  return (
    <>
      <CustomButton
        role="button"
        aria-haspopup="listbox"
        className={styles.dropdownButton}
        onClick={() => handle}
      >
        {typeof state == 'string' ? (
          <>
            {state}
            <ArrowDownIcon />
          </>
        ) : (
          state
        )}
      </CustomButton>
    </>
  );
}

export default DropDownButton;
