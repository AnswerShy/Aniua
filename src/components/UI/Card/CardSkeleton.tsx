import clsx from 'clsx';
import { TypographyType } from '../UIComponents';
import styles from './Card.module.css';

const CardSkeletonBlock = ({ countOfCards = 1 }: { countOfCards?: number }) => {
  return (
    <>
      {Array.from({ length: countOfCards }).map((_, i) => (
        <div className={clsx(styles.cardcontainer, 'w-[400px]')} key={i}>
          <div className={clsx('w-[400px] h-[750px]', styles.cardImage, styles.load)} />
          <p className={clsx(styles.cardText, TypographyType['button'].className)}>Load</p>
        </div>
      ))}
    </>
  );
};

export default CardSkeletonBlock;
