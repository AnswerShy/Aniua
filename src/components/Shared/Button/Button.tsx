'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import styles from './Button.module.css';
import { TypographyType } from '../SharedComponents';
import { sleep } from '@/utils/customUtils';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  url?: string;
  classString?: string;
  hideMenu?: () => void;
}

const CustomButton: React.FC<ButtonProps> = React.memo(({ url, hideMenu = null, children, classString, ...props }) => {
  const router = useRouter();

  const doLink = async (url: string, event: React.MouseEvent) => {
    event.preventDefault();
    if (hideMenu) {
      hideMenu();
    }
    document.getElementById('transition')?.classList.remove('hidden');
    await sleep(1000);
    router.push(url);
    await sleep(1000);
    document.getElementById('transition')?.classList.add('hidden');
  };

  return !url ? (
    <button className={clsx(`${styles.button}`, `${TypographyType['button'].className}`)} {...props}>
      {children}
    </button>
  ) : (
    <Link href={url} className={clsx(classString ?? `${styles.button}`, `${TypographyType['button'].className}`)}>
      <div onClick={(event) => doLink(url, event)}>{children}</div>
    </Link>
  );
});
CustomButton.displayName = 'CustomButton';

export default CustomButton;
