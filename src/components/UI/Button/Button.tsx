'use client';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './Button.module.css';
import { TypographyType } from '@/components/UI/UIComponents';
import React from 'react';
import { useTransitionRouter } from 'next-view-transitions';

const variants = {
  button: styles.button,
  outline: styles.outline,
  secondary: styles.secondary,
  link: `${styles.link} border-animate`,
  primary: styles.primary,
} as const;

type VariantType = keyof typeof variants;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  url?: string;
  classString?: string;
  hideMenu?: () => void;
  variant?: VariantType;
  isAnimate?: boolean;
}

const CustomButton: React.FC<ButtonProps> = React.memo(
  ({
    url,
    hideMenu = null,
    children,
    classString,
    variant = 'button',
    isAnimate = true,
    ...props
  }) => {
    const router = useTransitionRouter();

    const doLink = async (url: string, event: React.MouseEvent) => {
      event.preventDefault();
      if (hideMenu) {
        hideMenu();
      }
      router.push(url, {
        onTransitionReady: isAnimate ? pageAnimation : undefined,
      });
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
        className={clsx(variants[variant], classString, `${TypographyType['button'].className}`)}
        onClick={(event) => doLink(url, event)}
      >
        {children}
      </Link>
    );
  },
);
CustomButton.displayName = 'CustomButton';

const pageAnimation = () => {
  document.documentElement.animate(
    [
      {
        opacity: 1,
        scale: 1,
        transform: 'translateY(0)',
      },
      {
        opacity: 0,
        scale: 0.5,
      },
    ],
    {
      duration: 500,
      easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
      fill: 'forwards',
      pseudoElement: '::view-transition-old(root)',
    },
  );

  document.documentElement.animate(
    [
      {
        opacity: 0,
        scale: 0.5,
      },
      {
        opacity: 1,
        scale: 1,
      },
    ],
    {
      duration: 500,
      easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
      fill: 'forwards',
      pseudoElement: '::view-transition-new(root)',
    },
  );
};

export default CustomButton;
