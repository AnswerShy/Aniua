'use client';

import { CustomButton, TypographyType } from '../UIComponents';
import styles from './Card.module.css';
import Image from 'next/image';

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
      {Object.entries(genres).length > 0 ? (
        genres.map((el) => <span key={el.id}>{el.title}</span>)
      ) : (
        <p>unknown genres (?)</p>
      )}
    </>
  );
};

const Card: React.FC<cardProps> = ({ image, title, slug, variant = 'default', additional }) => {
  return variant == 'default' ? (
    <CustomButton url={`/anime/${slug}`} classString={styles.cardcontainer}>
      <Image src={image} alt={title} width={500} height={750} className={styles.cardImage} />
      <p className={styles.cardText}>{title}</p>
    </CustomButton>
  ) : (
    <CustomButton
      onClick={additional?.onClick}
      url={`/anime/${slug}`}
      classString={styles.cardHorizontal}
    >
      <div
        className={styles.cardImageHorizontal}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div>
        <p className={TypographyType['h2'].className}>{title}</p>
        <div
          className={TypographyType['muted'].className}
          style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}
        >
          {genres(additional?.year || 0, additional?.genres || [])}
        </div>
      </div>
    </CustomButton>
  );
};

export default Card;
