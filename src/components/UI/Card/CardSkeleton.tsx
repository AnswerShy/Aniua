import styles from './Card.module.css';

const CardSkeletonBlock = ({ countOfCards = 1 }: { countOfCards?: number }) => {
  return (
    <>
      {Array.from({ length: countOfCards }).map((_, i) => (
        <div key={i} className={`${styles.card}`}>
          <div className={`${styles.cardContainer} ${styles.load} min-h-80`} />
          <p className={`${styles.cardTitle} ${styles.load}`}>title</p>
        </div>
      ))}
    </>
  );
};

export default CardSkeletonBlock;
