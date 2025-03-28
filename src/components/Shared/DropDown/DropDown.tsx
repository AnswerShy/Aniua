'use client';

import { useState } from 'react';
import styles from './DropDown.module.css';
import TransitionLink from '@/utils/custom/onClickAnimation';
import { TypographyType } from '../SharedComponents';

import { KeyboardArrowDownIcon } from '@/utils/icons';
import { getTranslatedText } from '@/utils/customUtils';
import { KeyboardArrowUp } from '@mui/icons-material';

interface DropdownProps {
  currentState?: string; //For show current state
  children?: React.ReactNode; //For show current state as Node

  /* Container of dropdown with enum of actions */
  actionList?: Record<string, string>; //Enum of action, example home: '/'
  /* OR */
  assetsList?: string[]; //Array of objects for dropdown
  changeState?: (index: number) => void; //Changer of the state for assetsList

  isLeft?: boolean;
}

const Dropdown = ({
  currentState,
  actionList,
  assetsList,
  changeState,
  children,
  isLeft = true,
}: DropdownProps) => {
  const [visible, setVision] = useState(true);
  const handleVisible = () => setVision((prev) => !prev);

  const handleOptionSelect = (index: number) => {
    if (changeState) changeState(index);
    setVision(false);
  };

  return actionList ? (
    <>
      <button
        tabIndex={0}
        className={`${styles.dropdownMenu} ${isLeft ? 'items-start' : 'items-end'}`}
        onClick={handleVisible}
        aria-haspopup="listbox"
        aria-expanded={visible}
        aria-controls="dropdown-options"
      >
        {children ? (
          children
        ) : (
          <div role="select" className={`${TypographyType['button'].className}`}>
            {currentState && getTranslatedText('paths', currentState)}
            {visible ? (
              <KeyboardArrowDownIcon sx={{ fontSize: '1.5rem' }} />
            ) : (
              <KeyboardArrowUp sx={{ fontSize: '1.5rem' }} />
            )}
          </div>
        )}
        <div className={`${styles.optionsWrap} ${!visible ? styles.visibleOptionWrap : null}`}>
          {Object.entries(actionList).map(([key, action]) => (
            <TransitionLink url={action} key={key} className={styles.option} isVision={handleVisible}>
              {getTranslatedText('paths', key)}
            </TransitionLink>
          ))}
        </div>
      </button>
    </>
  ) : (
    <>
      <div className={`${TypographyType['button'].className}`} onClick={handleVisible}>
        <div className={`${styles.dropdownButton}`}>
          {assetsList && assetsList[Number(currentState)]}
          <KeyboardArrowDownIcon sx={{ fontSize: '1.5rem' }} />
        </div>
        <div className={`${styles.optionsWrap} ${!visible ? styles.visibleOptionWrap : null}`}>
          {assetsList &&
            assetsList.map((studio, index) => (
              <div key={index} className={styles.option} onClick={() => handleOptionSelect(index)}>
                {studio.charAt(0).toUpperCase() + studio.slice(1)}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default Dropdown;
