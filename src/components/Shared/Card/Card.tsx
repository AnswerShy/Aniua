'use client';

import clsx from 'clsx';
import { CustomButton, TypographyType } from '../SharedComponents';
import styles from './Card.module.css';

interface cardProps {
  image: string | '/next.svg';
  title: string;
  slug: string;
  variant?: 'horizontal' | 'default';
  additional?: {
    year: number;
    genres: AnimeGenres[];
    onClick?: () => void;
  };
}

const genres = (year: number, genres: AnimeGenres[] | []) => {
  if (!genres) return null;
  return (
    <>
      <span>{year}</span>
      <span>•</span>
      {Object.entries(genres).length > 0 ? genres.map((el) => <span key={el.id}>{el.title}</span>) : <p>unknown genres (?)</p>}
    </>
  );
};

const Card: React.FC<cardProps> = ({ image, title, slug, variant = 'default', additional }) => {
  return variant == 'default' ? (
    <CustomButton url={`/Anime/${slug}`} classString={styles.card}>
      <div className={styles.cardImage} style={{ backgroundImage: `url(${image})` }} />
      <p className={clsx(styles.cardTitle, TypographyType['button'].className)} title={title}>
        {title}
      </p>
    </CustomButton>
  ) : (
    <CustomButton onClick={additional?.onClick} url={`/Anime/${slug}`} classString={styles.cardHorizontal}>
      <div className={styles.cardImageHorizontal} style={{ backgroundImage: `url(${image})` }} />
      <div>
        <p className={TypographyType['h2'].className}>{title}</p>
        <div className={TypographyType['h4'].className} style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
          {genres(additional?.year || 0, additional?.genres || [])}
        </div>
      </div>
    </CustomButton>
  );
};

export default Card;
