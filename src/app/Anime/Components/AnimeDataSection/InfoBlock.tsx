'use client';
import Image from 'next/image';
import { useState } from 'react';

import descriptionCutter from '@/utils/custom/descriptionCutter';

import styles from './InfoBlock.module.css';
import { CustomButton, Dropdown, Section, Typography, TypographyType } from '../../../../components/UI/UIComponents';
import { i18n } from '@/utils/customUtils';
import { paths } from '@/constants/headersconst';
import clsx from 'clsx';

interface Props {
  infoData: AnimeDataInterface;
}

const genres = (year: number, genres: AnimeGenres[]) => {
  if (!genres) return null;
  return (
    <div className={styles.genresRow}>
      <CustomButton variant="link" key={year} url={`${paths.list}/?year=${year}`}>
        {year}
      </CustomButton>
      <p>•</p>
      {Object.entries(genres).length > 0 ? (
        genres.map((el) => (
          <CustomButton variant="link" key={el.id} url={`${paths.list}/?genre=${el.slug}`}>
            {el.title}
          </CustomButton>
        ))
      ) : (
        <p>unknown genres (?)</p>
      )}
    </div>
  );
};

const InfoBlock: React.FC<Props> = ({ infoData }) => {
  const slicedText = descriptionCutter(infoData.description, 50);

  const [displayedText, setFullDescription] = useState(slicedText);
  const [isFullTextDisplayed, setIsFullTextDisplayed] = useState(false);

  const descHandler = () => {
    const moreLessButton = document.getElementById('descriptionButton');
    if (isFullTextDisplayed) {
      setFullDescription(slicedText);
      if (moreLessButton) moreLessButton.innerHTML = ` ...${i18n.t('info.more')}`;
      document.getElementById('desc')?.classList.add('text-justify');
      setIsFullTextDisplayed(false);
    } else {
      setFullDescription(infoData.description);
      if (moreLessButton) moreLessButton.innerHTML = ` ...${i18n.t('info.less')}`;
      document.getElementById('desc')?.classList.remove('text-justify');
      setIsFullTextDisplayed(true);
    }
  };
  return (
    <Section typeOfSection={'ThreeColsSection'}>
      {/* First column */}
      <div className={styles.posterColumn}>
        <Image src={infoData.poster} alt={infoData.title} className="rounded-xl self-center" height={350} width={250} />
        <Dropdown currentState={i18n.t('info.addToList')}></Dropdown>
      </div>

      {/* Second column */}
      <div className={styles.titleDescColumn}>
        <div className={styles.infoRow}>
          <Typography variant="h2">{infoData.title}</Typography>
          {genres(infoData.year, infoData.genres)}
        </div>

        <div>
          <Typography variant="h2">{i18n.t('info.Description')}</Typography>
          <Typography variant="body1" id="desc">
            {displayedText}
            <a onClick={descHandler} id="descriptionButton">
              {` ...${i18n.t('info.more')}`}
            </a>
          </Typography>
        </div>
      </div>

      {/* Third column */}
      <div className={styles.detailColumn}>
        <Typography variant="h2">{i18n.t('info.Details')}</Typography>
        <div className={clsx(styles.subBlock, TypographyType['body1'].className)}>
          <DetailRow title={i18n.t('info.Type')} data={infoData.type.title} url={infoData.type.slug} />
          <DetailRow title={i18n.t('info.Status')} data={infoData.status} url={infoData.status} />
          <DetailRow title={i18n.t('info.Episodes')} data={episodesInfo(infoData.episode.present, infoData.episode.last)} />
          <DetailRow title={i18n.t('info.Rate')} data={infoData.mal_score} />
          <DetailRow title={i18n.t('info.Year')} data={infoData.year} />
          <DetailRowMultiplie title={i18n.t('info.Genres')} data={infoData.genres} />
        </div>
      </div>
    </Section>
  );
};

export default InfoBlock;

const DetailRow = ({ title, data, url }: { title: string; data: string | number; url?: string }) => {
  return (
    <span className={styles.subRow}>
      <p>{title}: </p>
      {url ? (
        <CustomButton url={`${paths.list}/${url}`} classString={styles.subText}>
          {data}
        </CustomButton>
      ) : (
        <div className={styles.subText}>{data}</div>
      )}
    </span>
  );
};

const DetailRowMultiplie = ({ title, data }: { title: string; data: AnimeGenres[] }) => {
  return (
    <span className={styles.subRow}>
      <p>{title}: </p>
      <div className={styles.detailsArray}>
        {Object.entries(data).map((element, key) => {
          return (
            <CustomButton key={key} url={`${paths.list}/${element[1].slug}`} classString={styles.subText}>
              {element[1].title}
            </CustomButton>
          );
        })}
      </div>
    </span>
  );
};

const episodesInfo = (present: string | null, last: number | null): string => {
  return `${present ? present : '? / '} ${last ? last : '?'}`;
};
