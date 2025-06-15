'use client';

import { ReactElement, useState } from 'react';
import styles from './DropDown.module.css';
import { CustomButton, TypographyType } from '../UIComponents';

import { KeyboardArrowUp } from '@mui/icons-material';
import clsx from 'clsx';
import React from 'react';

interface DropdownProps {
  currentState?: string; //For show current state
  children?: React.ReactNode; //For show current state as Node

  customElement?: React.ReactNode; //For show custom element

  position?: 'left' | 'right' | 'center'; //For change position of dropdown options menu
}

const Dropdown = ({
  currentState,
  customElement,
  children,
  position = 'center',
}: DropdownProps) => {
  const [visible, setVision] = useState(false);
  const handleVisible = () => {
    setVision((prev) => !prev);
  };
  const hideDropdown = () => setVision(true);
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
        style={{
          left: position === 'left' ? '0' : position === 'center' ? 'auto' : 'auto',
          right: position === 'right' ? '0' : 'auto',
        }}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as ReactElement<{ hideDropdown?: () => void }>, {
                hideDropdown,
              })
            : child,
        )}
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

const optionUrl = ({
  href,
  state,
  hideDropdown,
}: {
  href: string;
  state: string;
  hideDropdown?: () => void;
}) => {
  return (
    <>
      <CustomButton hideMenu={hideDropdown} url={href} classString={styles.option}>
        {state}
      </CustomButton>
    </>
  );
};

const optionAction = React.memo(
  ({
    handleOptionSelectAction,
    state,
    hideDropdown,
  }: {
    handleOptionSelectAction: () => void;
    state?: string;
    hideDropdown?: () => void;
  }) => {
    return (
      <>
        <div
          role="option"
          className={styles.option}
          onClick={() => {
            handleOptionSelectAction();
            if (hideDropdown) hideDropdown();
          }}
        >
          {state && state.charAt(0).toUpperCase() + state.slice(1)}
        </div>
      </>
    );
  },
);
optionAction.displayName = 'OptionAction';

Dropdown.optionUrl = optionUrl;
Dropdown.optionAction = optionAction;
