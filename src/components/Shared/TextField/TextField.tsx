import styles from './TextField.module.css';
import { ErrorIcon } from '@/utils/icons';
import { ChangeEvent, forwardRef, HTMLInputTypeAttribute } from 'react';

type TextFieldProps = {
  value: string | number;
  type?: HTMLInputTypeAttribute;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errorString: string | undefined;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ type = 'text', onChange, errorString, ...rest }, ref) => (
    <>
      <div className={styles.fieldWrap}>
        <input ref={ref} type={type} onChange={onChange} placeholder=" " className={styles.fieldText} {...rest} />
        <label className={styles.fieldLabel}>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
      </div>
      {errorString && (
        <div className={styles.fieldError}>
          <ErrorIcon fontSize="medium" />
          <span>{errorString}</span>
        </div>
      )}
    </>
  ),
);

TextField.displayName = 'TextField';

export default TextField;
