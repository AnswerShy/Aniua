'use client';

import { useEffect, useRef, useState } from 'react';
import React from 'react';
import DropDownButton from './DropDownButton/DropDownButton';
import DropDownMenu from './DropDownMenu/DropDownMenu';
import styles from './DropDown.module.css';

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
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleVisible = () => {
    setVision((prev) => !prev);
  };
  const hideDropdown = () => setVision(false);

  const handleClickOutside = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setVision(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-haspopup="listbox"
      aria-expanded={visible}
      onClick={handleVisible}
      aria-controls="dropdown-options"
      className={styles.dropdownWrapper}
    >
      <DropDownButton handle={handleVisible} state={customElement || currentState} />
      <DropDownMenu hideDropdown={hideDropdown} isVisible={visible} position={position}>
        {children}
      </DropDownMenu>
    </div>
  );
};
export default Dropdown;
