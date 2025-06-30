'use client';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './Button.module.css';
import { TypographyType } from '@/components/UI/UIComponents';
import React from 'react';
import { useRouter } from 'next/navigation';

const variants = {
  button: clsx(styles.ghost, styles.button),
  outline: clsx(styles.outline, styles.button),
  secondary: clsx(styles.secondary, styles.button),
  link: clsx(styles.link, `border-animate`),
  primary: clsx(styles.primary, styles.button),
} as const;

type VariantType = keyof typeof variants;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  url?: string;
  classString?: string;
  hideMenu?: () => void;
  variant?: VariantType;
}

const CustomButton: React.FC<ButtonProps> = React.memo(
  ({ url, hideMenu = null, children, classString, variant = 'button', ...props }) => {
    const router = useRouter();

    const doLink = async (url: string, event: React.MouseEvent) => {
      event.preventDefault();
      if (hideMenu) {
        hideMenu();
      }
      router.push(url);
    };

    return !url ? (
      <button
        className={clsx(variants[variant], classString, `${TypographyType['button'].className}`)}
        {...props}
      >
        {children}
      </button>
    ) : (
      <Link
        href={url}
        className={clsx(
          !classString ? `${variants[variant]} ${TypographyType['button'].className}` : classString,
        )}
        onClick={(event) => doLink(url, event)}
        scroll={false}
      >
        {children}
      </Link>
    );
  },
);
CustomButton.displayName = 'CustomButton';

export default CustomButton;
