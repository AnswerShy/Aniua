import React from 'react';
import styles from './Checkbox.module.css';
interface checkboxProps {
  title: string;
  onChange?: () => void;
  checked?: boolean;
}

function Checkbox({ title, onChange, checked }: checkboxProps) {
  return (
    <label className={styles.checkbox}>
      <input checked={checked} type="checkbox" onChange={onChange} className={styles.checkinput} />
      {title}
    </label>
  );
}

export default Checkbox;
