'use client';

import styles from './Card.module.css';
import TransitionLink from '@/utils/custom/onClickAnimation';

interface cardProps {
  image: string | '/next.svg';
  title: string;
  slug: string;
}

const Card: React.FC<cardProps> = ({ image, title, slug }) => {
  return (
    <TransitionLink url={`/Anime/${slug}`} className={styles.card}>
      <div
        className={styles.cardImage}
        style={{ backgroundImage: `url(${image})` }}
      />
      <p className={styles.cardTitle} title={title}>
        {title}
      </p>
    </TransitionLink>
  );
};

export default Card;
