'use client';

import { useState } from 'react';
import styles from './DropDown.module.css';
import { CustomButton, TypographyType } from '../SharedComponents';

import { getTranslatedText } from '@/utils/customUtils';
import { KeyboardArrowUp } from '@mui/icons-material';
import clsx from 'clsx';
import React from 'react';

interface DropdownProps {
  currentState?: string; //For show current state
  children?: React.ReactNode; //For show current state as Node

  customElement?: React.ReactNode; //For show custom element

  isLeft?: boolean; //For change position of dropdown options menu
}

const Dropdown = ({ currentState, customElement, children, isLeft = true }: DropdownProps) => {
  const [visible, setVision] = useState(false);
  const handleVisible = () => setVision((prev) => !prev);

  const Icon = KeyboardArrowUp;

  return (
    <DropdownButton onClick={handleVisible} visible>
      {/*If children is not provided, then show the default dropdown*/}
      {customElement ?? (
        <div role="select">
          {currentState}
          <Icon />
        </div>
      )}

      {/*Options for the dropdown*/}
      <div
        className={`${styles.optionsWrap} ${!visible ? styles.hideOptions : null}`}
        style={{ left: isLeft ? '0' : 'auto', right: isLeft ? 'auto' : '0' }}
      >
        {children}
      </div>
    </DropdownButton>
  );
};
export default Dropdown;

const DropdownButton = ({
  children,
  onClick,
  visible,
}: {
  children: React.ReactNode;
  onClick: () => void;
  visible: boolean;
}) => (
  <button
    className={clsx(
      `${styles.dropdownButton}`,
      `${TypographyType['button'].className}`,
      `${children ? styles.dropdownChildren : null}`,
    )}
    onClick={onClick}
    aria-haspopup="listbox"
    aria-expanded={visible}
    aria-controls="dropdown-options"
  >
    {children}
  </button>
);

const optionUrl = ({ href, state }: { href: string; state: string }) => {
  return (
    <>
      <CustomButton url={href} classString={styles.option}>
        {getTranslatedText('paths', state)}
      </CustomButton>
    </>
  );
};

const optionAction = React.memo(
  ({ handleOptionSelectAction, state }: { handleOptionSelectAction: () => void; state?: string }) => {
    return (
      <>
        <div role="option" className={styles.option} onClick={() => handleOptionSelectAction()}>
          {state && state.charAt(0).toUpperCase() + state.slice(1)}
        </div>
      </>
    );
  },
);
optionAction.displayName = 'OptionAction';

Dropdown.optionUrl = optionUrl;
Dropdown.optionAction = optionAction;
