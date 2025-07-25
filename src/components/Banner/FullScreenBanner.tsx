'use client';

import descriptionCutter from '@/utils/descriptionCutter';
import styles from './FullScreenBanner.module.css';
import Image from 'next/image';
import {
  Section,
  Typography,
  TypographyType,
  CreepingText,
  CustomButton,
} from '../UI/UIComponents';
import clsx from 'clsx';
import { getTranslatedText } from '@/utils';
import { paths } from '@/constants/headersconst';

interface Banner_props {
  bannerImage?: string | null;
  bannerTitle: string;
  bannerYear?: number | null;
  bannerGenres?: AnimeGenres[] | null;
  bannerDesc: string;
  bannerChar?: string | null;
  bannerTypeNews?: boolean;
  playerID?: string;
  bannerJapaneese?: string;
}

const Banner: React.FC<Banner_props> = ({
  bannerImage,
  bannerTitle,
  bannerChar,
  bannerYear,
  bannerGenres,
  bannerDesc,
  playerID,
  bannerJapaneese,
}) => {
  const usePicAsBg = false;
  return (
    <Section typeOfSection={'BannerSection'}>
      <InfoBlockBanner
        bannerTitle={bannerTitle}
        bannerYear={bannerYear}
        bannerGenres={bannerGenres}
        bannerDesc={bannerDesc}
        playerID={playerID}
      />
      <Image
        src={bannerImage || bannerChar || 'pfp.png'}
        className={clsx(usePicAsBg ? styles.bannerBackgroundImage : styles.bannerChar)}
        alt="animeImage"
        width={250}
        height={350}
      />
      <CreepingText text={bannerJapaneese || bannerTitle} speed={20} />
    </Section>
  );
};

export default Banner;

const genresDisplay = (genres: animeBannerInterface['genres']): JSX.Element | null => {
  return genres ? (
    <>
      {genres.map((el, index) => (
        <CustomButton
          variant="link"
          className={TypographyType['h1'].className}
          key={index}
          url={`${paths.list}/?genres=${el.slug}`}
        >
          {el.title}
        </CustomButton>
      ))}
    </>
  ) : null;
};

const InfoBlockBanner = ({
  bannerTitle,
  bannerYear,
  bannerGenres,
  bannerDesc,
  playerID,
}: Banner_props) => {
  return (
    <div className={styles.bannerInfoContainer}>
      <div className="flex flex-row items-center gap-2">
        <Typography variant="h1">{bannerTitle}</Typography>
        <CustomButton variant="primary" url={`#${playerID}`}>
          {getTranslatedText('info.Watch')}
        </CustomButton>
      </div>

      <div className={`${styles.bannerBaseInfo}`}>
        <CustomButton variant="link" url={`${paths.list}/?year=${bannerYear}`}>
          {bannerYear ? bannerYear : null}
        </CustomButton>
        <span>•</span>
        {bannerGenres && bannerGenres.length > 0 ? (
          genresDisplay(bannerGenres)
        ) : (
          <Typography variant="p">unknow genres</Typography>
        )}
      </div>
      <p className={`${styles.bannerDescription}`}>{descriptionCutter(bannerDesc, 25)}...</p>
    </div>
  );
};
