import { i18n } from '@/utils/customUtils';
import styles from './TextField.module.css';
import { ErrorIcon } from '@/utils/icons';
import { ChangeEvent, forwardRef, HTMLInputTypeAttribute } from 'react';

type TextFieldProps = {
  value: string | number;
  type?: HTMLInputTypeAttribute;
  label?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errorString: string | undefined;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ type = 'text', label, onChange, errorString, ...rest }, ref) => {
    return (
      <>
        <div className={styles.fieldWrap}>
          <input
            ref={ref}
            type={type}
            onChange={onChange}
            placeholder=" "
            className={styles.fieldText}
            {...rest}
          />
          <label className={styles.fieldLabel}>{i18n.t(`login.${label ? label : type}`)}</label>
        </div>

        <div className={`${!errorString ? 'hidden' : styles.fieldError}`}>
          <ErrorIcon fontSize="medium" />
          <span>{errorString}</span>
        </div>
      </>
    );
  },
);

TextField.displayName = 'TextField';

export default TextField;
