'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import styles from './Button.module.css';
import { TypographyType } from '../SharedComponents';
import { sleep } from '@/utils/customUtils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  url?: string;
}

const CustomButton: React.FC<ButtonProps> = ({ url, children, ...props }) => {
  const router = useRouter();

  const doLink = async (url: string, event: React.MouseEvent) => {
    event.preventDefault();
    document.getElementById('transition')?.classList.remove('hidden');
    await sleep(1000);
    router.push(url);
    await sleep(1000);
    document.getElementById('transition')?.classList.add('hidden');
  };

  return !url ? (
    <button tabIndex={0} className={clsx(`${styles.button}`, `${TypographyType['button'].className}`)} {...props}>
      {children}
    </button>
  ) : (
    <Link href={url} tabIndex={0} className={clsx(`${styles.button}`, `${TypographyType['button'].className}`)}>
      <div onClick={(event) => doLink(url, event)} className="relative w-full h-full rounded-xl">
        {children}
      </div>
    </Link>
  );
};

export default CustomButton;
