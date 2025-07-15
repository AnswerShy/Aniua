import clsx from 'clsx';
import React from 'react';
import styles from './dropdownMenu.module.css';

interface DropDownMenu {
  children: React.ReactNode;
  hideDropdown: () => void;
  position?: 'left' | 'right' | 'center';
  isVisible: boolean;
}

function DropDownMenu({ position, hideDropdown, isVisible, children }: DropDownMenu) {
  return (
    <div
      onClick={hideDropdown}
      role="listbox"
      className={clsx(
        'transition-all duration-200',
        isVisible ? undefined : styles.invisible,
        styles.dropdownMenu,
        position === 'left' && 'left-0',
        position === 'right' && 'right-0',
        position === 'center' && 'left-1/2 transform -translate-x-1/2',
        'dropdownMenu',
      )}
    >
      {children}
    </div>
  );
}

export default DropDownMenu;
