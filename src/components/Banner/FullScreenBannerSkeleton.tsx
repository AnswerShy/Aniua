import { Section } from '../UI/UIComponents';
import styles from './FullScreenBanner.module.css';

const BannerSkeleton = () => {
  return (
    <Section typeOfSection={'BannerSection'}>
      <div className={styles.bannerInfoContainer} style={{ width: '50%' }}>
        <h1 className={`${styles.load}`} style={{ width: '50%' }}>
          TITLE
        </h1>
        <div className={styles.bannerBaseInfo}>
          <p className={styles.load}>0000</p>
          <span>•</span>
          <p className={styles.load} style={{ width: '100%' }}>
            genre, genre, genre
          </p>
        </div>
        <p className={`${styles.bannerDescriptionLoad} ${styles.load}`}>...</p>
      </div>
      {/* {bannerChar ? <div className="bannerChar" style={{ backgroundImage: `url(${bannerChar})` }}></div> : null} */}
    </Section>
  );
};

export default BannerSkeleton;
