'use client';

import descriptionCutter from '@/utils/custom/descriptionCutter';
import styles from './FullScreenBanner.module.css';
import Image from 'next/image';
import { Section, Typography, TypographyType, CreepingText, CustomButton } from '../Shared/SharedComponents';
import clsx from 'clsx';

interface Banner_props {
  bannerImage?: string | null;
  bannerTitle: string;
  bannerYear?: number | null;
  bannerGenres?: AnimeGenres[] | null;
  bannerDesc: string;
  bannerChar?: string | null;
  bannerTypeNews?: boolean;
}

const Banner: React.FC<Banner_props> = ({ bannerImage, bannerTitle, bannerChar, bannerYear, bannerGenres, bannerDesc }) => {
  const usePicAsBg = false;
  return (
    <Section typeOfSection={'Banner'}>
      <InfoBlockBanner bannerTitle={bannerTitle} bannerYear={bannerYear} bannerGenres={bannerGenres} bannerDesc={bannerDesc} />
      <Image src={bannerImage || bannerChar || ''} className={clsx(usePicAsBg ? styles.bannerBackgroundImage : styles.bannerChar)} alt="animeImage" width={250} height={350} />
      <CreepingText text={bannerTitle} speed={20} />
    </Section>
  );
};

export default Banner;

const genresDisplay = (genres: animeBannerInterface['genres']): JSX.Element | null => {
  return genres ? (
    <>
      {genres.map((el, index) => (
        <CustomButton className={TypographyType['h2'].className} key={index} url={`/genres/${el.slug}`}>
          {el.title}
        </CustomButton>
      ))}
    </>
  ) : null;
};

const InfoBlockBanner = ({ bannerTitle, bannerYear, bannerGenres, bannerDesc }: Banner_props) => {
  return (
    <div className={styles.bannerInfoContainer}>
      <Typography variant="h1" classname={styles.bannerTitle}>
        {bannerTitle}
      </Typography>
      <div className={`${styles.bannerBaseInfo} ${styles.bannerText}`}>
        <Typography variant="body1">{bannerYear ? bannerYear : null}</Typography>
        <span>•</span>
        {bannerGenres && bannerGenres.length > 0 ? genresDisplay(bannerGenres) : <Typography variant="body1">unknow genres</Typography>}
      </div>
      <p className={`${styles.bannerDescription} ${styles.bannerText}`}>{descriptionCutter(bannerDesc, 25)}...</p>
    </div>
  );
};
