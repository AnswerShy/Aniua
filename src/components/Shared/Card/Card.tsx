'use client';

import clsx from 'clsx';
import { CustomButton, TypographyType } from '../SharedComponents';
import styles from './Card.module.css';

interface cardProps {
  image: string | '/next.svg';
  title: string;
  slug: string;
}

const Card: React.FC<cardProps> = ({ image, title, slug }) => {
  return (
    <CustomButton url={`/Anime/${slug}`} classString={styles.card}>
      <div className={styles.cardImage} style={{ backgroundImage: `url(${image})` }} />
      <p className={clsx(styles.cardTitle, TypographyType['button'].className)} title={title}>
        {title}
      </p>
    </CustomButton>
  );
};

export default Card;
