import styles from './TextField.module.css';
import { ErrorIcon } from '@/utils/icons';
import { ChangeEvent, forwardRef, HTMLInputTypeAttribute } from 'react';
import { TypographyType } from '@/components/UI/UIComponents';
import clsx from 'clsx';

type TextFieldProps = {
  value: string | number;
  type?: HTMLInputTypeAttribute;
  label?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  errorString?: string | undefined;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  readonly?: boolean;
  kbd?: string;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({ value, kbd, readonly, onClick, type = 'text', placeholder, onKeyDown, label, onChange, errorString, ...rest }, ref) => {
  return (
    <>
      <div className={clsx(styles.inputText, 'border-animate')}>
        <input value={onChange && value} readOnly={readonly} ref={ref} type={type} onChange={onChange} onClick={onClick} placeholder={(placeholder ?? label ?? value ?? type).toString()} onKeyDown={onKeyDown} {...rest} />
        {kbd ? <kbd className="pointer-events-none select-none items-center gap-1 rounded bg-muted px-1.5 opacity-100">{kbd}</kbd> : null}
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
