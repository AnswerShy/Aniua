import clsx from 'clsx';
import { TypographyType } from '../UIComponents';
import styles from './Card.module.css';

const CardSkeletonBlock = ({ countOfCards = 1 }: { countOfCards?: number }) => {
  return (
    <>
      {Array.from({ length: countOfCards }).map((_, i) => (
        <div className={styles.card + ' w-[150px]'} key={i}>
          <div className={clsx(styles.cardImage, styles.load)} />
          <p className={clsx(styles.cardTitle, TypographyType['button'].className)}>Load</p>
        </div>
      ))}
    </>
  );
};

export default CardSkeletonBlock;
