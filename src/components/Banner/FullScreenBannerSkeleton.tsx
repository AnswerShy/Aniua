import { Section } from '../UI/UIComponents';
import styles from './FullScreenBanner.module.css';

const BannerSkeleton = () => {
  return (
    <Section typeOfSection={'Banner'}>
      <div className={styles.bannerInfoContainer}>
        <h1 className={`${styles.bannerTitle} ${styles.load}`}>TITLE</h1>
        <div className={styles.bannerBaseInfo}>
          <p className={styles.load}>0000</p>
          <span>•</span>
          <p className={styles.load}>genre, genre, genre</p>
        </div>
        <p className={`${styles.bannerDescriptionLoad} ${styles.load}`}>...</p>
      </div>
      {/* {bannerChar ? <div className="bannerChar" style={{ backgroundImage: `url(${bannerChar})` }}></div> : null} */}
    </Section>
  );
};

export default BannerSkeleton;
