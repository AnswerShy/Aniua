import React from 'react';
import styles from './Checkbox.module.css';
interface checkboxProps {
  title: string;
  checked: boolean;
  onChange?: () => void;
}

function Checkbox({ title, onChange, checked, ...props }: checkboxProps) {
  return (
    <label className={styles.checkbox}>
      <input
        checked={checked}
        type="checkbox"
        onChange={onChange}
        {...props}
        className={styles.checkinput}
      />
      {title}
    </label>
  );
}

export default Checkbox;
