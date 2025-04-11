import styles from './TextField.module.css';
import { ErrorIcon } from '@/utils/icons';
import { ChangeEvent, forwardRef, HTMLInputTypeAttribute } from 'react';
import { TypographyType } from '@/components/UI/UIComponents';

type TextFieldProps = {
  value: string | number;
  type?: HTMLInputTypeAttribute;
  label?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errorString?: string | undefined;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({ value, type = 'text', placeholder, onKeyDown, label, onChange, errorString, ...rest }, ref) => {
  return (
    <>
      <div className={styles.fieldWrap}>
        <input value={value} ref={ref} type={type} onChange={onChange} placeholder={placeholder ?? ' '} onKeyDown={onKeyDown} className={styles.fieldText} {...rest} />
        <label className={styles.fieldLabel}>{label || type}</label>
      </div>

      <div className={`${!errorString ? 'hidden' : styles.fieldError}`}>
        <ErrorIcon fontSize="medium" />
        <span className={TypographyType['body1'].className}>{errorString}</span>
      </div>
    </>
  );
});

TextField.displayName = 'TextField';

export default TextField;
