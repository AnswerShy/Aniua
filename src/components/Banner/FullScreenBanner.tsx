'use client';

import descriptionCutter from '@/utils/custom/descriptionCutter';
import styles from './FullScreenBanner.module.css';
import Image from 'next/image';
import { Section, Typography, TypographyType } from '../Shared/SharedComponents';
import { TransitionLink } from '@/utils/customUtils';

interface Banner_props {
  bannerImage: string | null;
  bannerTitle: string | null;
  bannerYear?: number | null;
  bannerGenres?: AnimeGenres[] | null;
  bannerDesc: string;
  bannerChar?: string | null;
  bannerTypeNews?: boolean;
}

const genresDisplay = (genres: animeBannerInterface['genres']): JSX.Element | null => {
  return genres ? (
    <>
      {genres.map((el, index) => (
        <TransitionLink className={TypographyType['h2'].className} key={index} url={`/genres/${el.slug}`}>
          {el.title}
        </TransitionLink>
      ))}
    </>
  ) : null;
};

const Banner: React.FC<Banner_props> = ({
  bannerImage,
  bannerTitle,
  bannerYear,
  bannerGenres,
  bannerDesc,
  bannerTypeNews = false,
}) => {
  return (
    <Section typeOfSection={'Banner'}>
      <Image src={bannerImage ? bannerImage : ''} className={styles.bannerBackgroundImage} alt="animeImage" fill />
      <div className={styles.bannerInfoContainer}>
        <Typography variant="h1">{bannerTitle}</Typography>
        {bannerTypeNews ? null : (
          <div className={`${styles.bannerBaseInfo} ${styles.bannerText}`}>
            <Typography variant="body1">{bannerYear ? bannerYear : null}</Typography>
            <span>•</span>
            {bannerGenres && bannerGenres.length > 0 ? (
              genresDisplay(bannerGenres)
            ) : (
              <Typography variant="body1">unknow genres</Typography>
            )}
          </div>
        )}
        <p className={`${styles.bannerDescription} ${styles.bannerText}`}>
          {descriptionCutter(bannerDesc, 25)}...
        </p>
      </div>
      {/* {bannerChar ? <div className="bannerChar" style={{ backgroundImage: `url(${bannerChar})` }}></div> : null} */}
    </Section>
  );
};

export default Banner;
