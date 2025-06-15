'use client';
import Image from 'next/image';
import { useState } from 'react';

import descriptionCutter from '@/utils/custom/descriptionCutter';

import styles from './InfoBlock.module.css';
import { CustomButton, Dropdown, Section, Table, Typography } from '@/components/UI/UIComponents';
import { i18n } from '@/utils/customUtils';
import { paths } from '@/constants/headersconst';
import { useUserStore } from '@/stores/store';
import FetchServiceInstance from '@/app/api';
import toast from 'react-hot-toast';

interface Props {
  infoData: AnimeDataInterface;
  playerID?: string;
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

const InfoBlock: React.FC<Props> = ({ infoData, playerID }) => {
  const slicedText = descriptionCutter(infoData.description, 50);
  const userStoredData = useUserStore((state) => state.user);

  const [displayedText, setFullDescription] = useState(slicedText);
  const [isFullTextDisplayed, setIsFullTextDisplayed] = useState(false);

  const addToList = async ({ list }: { list: string }) => {
    const data = await FetchServiceInstance.fetchHelper('lists/add/anime', {
      to: 'out',
      body: {
        anime_slug: infoData.slug,
        list_id: list,
      },
      method: 'POST',
    });

    if (data && data.message) {
      toast.success(data.message);
    }
  };

  const descHandler = () => {
    if (isFullTextDisplayed) {
      setFullDescription(slicedText);
      document.getElementById('desc')?.classList.add('text-justify');
      setIsFullTextDisplayed(false);
    } else {
      setFullDescription(infoData.description);
      document.getElementById('desc')?.classList.remove('text-justify');
      setIsFullTextDisplayed(true);
    }
  };
  return (
    <Section typeOfSection={'ThreeColsSection'}>
      <Section.Col className="lg:w-[13%]">
        <Image
          src={infoData.poster}
          alt={infoData.title}
          className="rounded-xl self-center"
          height={350}
          width={250}
        />
        <CustomButton variant="primary" isAnimate={false} url={`#${playerID}`}>
          {i18n.t('info.Watch')}
        </CustomButton>
        {userStoredData.anime_lists && (
          <Dropdown currentState={i18n.t('info.addToList')}>
            {userStoredData.anime_lists.map((e) => {
              return (
                <Dropdown.optionAction
                  handleOptionSelectAction={() => addToList({ list: e.id || '' })}
                  key={e.id}
                  state={e.title}
                ></Dropdown.optionAction>
              );
            })}
          </Dropdown>
        )}
      </Section.Col>

      <Section.Col widthState="2/4">
        <Section.Row>
          <Typography variant="h2">{infoData.title}</Typography>
          {genres(infoData.year, infoData.genres)}
        </Section.Row>
        <Section.Row>
          <Typography variant="h2">{i18n.t('info.Description')}</Typography>
          <Typography variant="p" id="desc">
            {displayedText}
            <CustomButton variant="link" onClick={descHandler} id="descriptionButton">
              {!isFullTextDisplayed ? ` ...${i18n.t('info.more')}` : ` ...${i18n.t('info.less')}`}
            </CustomButton>
          </Typography>
        </Section.Row>
      </Section.Col>

      <Section.Col widthState="1/4">
        <Table title={i18n.t('info.Details')}>
          <Table.row
            title={i18n.t('info.Type')}
            data={infoData.type.title}
            url={`${paths.list}/?type=${infoData.type.slug}`}
          />
          <Table.row
            title={i18n.t('info.Status')}
            data={infoData.status}
            url={`${paths.list}/?status=${infoData.status}`}
          />
          <Table.row
            title={i18n.t('info.Episodes')}
            data={episodesInfo(infoData.episode.present, infoData.episode.last)}
          />
          <Table.row
            title={i18n.t('info.Rate')}
            data={infoData.mal_score.toString()}
            url={`${paths.list}/?mal_score=${infoData.mal_score}`}
          />
          <Table.row
            title={i18n.t('info.Year')}
            data={infoData.year.toString()}
            url={`${paths.list}/?year=${infoData.year}`}
          />
          <Table.row title={i18n.t('info.Genres')} data={infoData.genres} />
        </Table>
      </Section.Col>
    </Section>
  );
};

export default InfoBlock;

const episodesInfo = (present: string | null, last: number | null): string => {
  return `${present ? present : '? / '} ${last ? last : '?'}`;
};
