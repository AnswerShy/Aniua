'use client';
import Image from 'next/image';
import { useState } from 'react';

import descriptionCutter from '@/utils/custom/descriptionCutter';
import Link from 'next/link';

import styles from './InfoBlock.module.css';
import { Section } from '../Shared/SharedComponents';
import { i18n } from '@/utils/customUtils';

interface Props {
  infoData: AnimeDataInterface;
}

const genres = (year: number, genres: AnimeGenres[]) => {
  return (
    <div className={styles.genresRow}>
      <p>{year}</p>
      <p>•</p>
      {genres.length > 0 ? (
        genres.map((el) => (
          <Link key={el.id} href={`/list/${el.slug}`}>
            {el.title}
          </Link>
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
    <Section typeOfSection={'flexThreeCols'}>
      <div className={styles.posterColumn}>
        <Image
          src={infoData.poster}
          alt={infoData.title}
          className="rounded-xl self-center"
          height={350}
          width={250}
        />
        <button className="w-full py-2.5 rounded-xl bg-b_t mt-5 text-white text-2xl">add to</button>
      </div>

      <div className={styles.titleDescColumn}>
        <div className={styles.infoRow}>
          <h1>{infoData.title}</h1>
          {genres(infoData.year, infoData.genres)}
        </div>

        <h1>{i18n.t('info.Description')}</h1>
        <p id="desc" className="mt-[12.5px]">
          {displayedText}
          <a onClick={descHandler} id="descriptionButton">
            {` ...${i18n.t('info.more')}`}
          </a>
        </p>
      </div>

      <div className={styles.detailColumn}>
        <div className={styles.infoRow}>
          <h1>{i18n.t('info.Rate')}</h1>
          <p>{infoData.mal_score}</p>
        </div>

        <div>
          <h1>{i18n.t('info.Details')}</h1>
          <div className={styles.subBlock}>
            <span className={styles.subRow}>
              <p>{i18n.t('info.Type')}: </p>
              <a className={styles.subText}>{infoData.type.title}</a>
            </span>
            <span className={styles.subRow}>
              <p>{i18n.t('info.Status')}: </p>
              <a className={styles.subText}>{infoData.status}</a>
            </span>
            <span className={styles.subRow}>
              <p>{i18n.t('info.Episodes')}: </p>
              <a className={styles.subText}>
                {infoData.is_ongoing && infoData.episode.present ? infoData.episode.present : '? / '}
                {infoData.episode.last ? infoData.episode.last : '?'}
              </a>
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default InfoBlock;
