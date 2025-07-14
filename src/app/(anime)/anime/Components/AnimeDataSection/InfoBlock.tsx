'use client';
import Image from 'next/image';
import { useState } from 'react';

import descriptionCutter from '@/utils/descriptionCutter';

import styles from './InfoBlock.module.css';
import {
  Card,
  CustomButton,
  Dropdown,
  Section,
  Slider,
  Table,
  Typography,
} from '@/components/UI/UIComponents';
import { getTranslatedText } from '@/utils';
import { paths } from '@/constants/headersconst';
import { useUserStore } from '@/stores/user-profile-store';
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
        <CustomButton variant="primary" url={`#${playerID}`}>
          {getTranslatedText('info.Watch')}
        </CustomButton>
        {userStoredData.anime_lists && (
          <Dropdown currentState={getTranslatedText('info.addToList')} position="center">
            {userStoredData.anime_lists.map((e) => {
              return (
                <CustomButton onClick={() => addToList({ list: e.id || '' })} key={e.id}>
                  {e.title}
                </CustomButton>
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
          <Typography variant="h2">{getTranslatedText('info.Description')}</Typography>
          <Typography variant="p" id="desc">
            {displayedText}
            <CustomButton variant="link" onClick={descHandler} id="descriptionButton">
              {!isFullTextDisplayed
                ? ` ...${getTranslatedText('info.more')}`
                : ` ...${getTranslatedText('info.less')}`}
            </CustomButton>
          </Typography>
        </Section.Row>
        {infoData.characters?.length > 1 ? (
          <Section.Row>
            <Typography variant="h2">{getTranslatedText('info.Characters')}</Typography>
            <Slider>
              {infoData.characters.map((el: Characters, index: number) => (
                <Card
                  key={index}
                  image={el.poster}
                  title={el.name_surname_ua}
                  slug={el.id.toString()}
                />
              ))}
            </Slider>
          </Section.Row>
        ) : null}
      </Section.Col>

      <Section.Col widthState="1/4">
        <Table title={getTranslatedText('info.Details')}>
          <Table.row
            title={getTranslatedText('info.Type')}
            data={infoData?.type?.title}
            url={`${paths.list}/?type=${infoData?.type?.slug}`}
          />
          <Table.row
            title={getTranslatedText('info.Status')}
            data={infoData?.status}
            url={`${paths.list}/?status=${infoData?.status}`}
          />
          <Table.row
            title={getTranslatedText('info.Episodes')}
            data={episodesInfo(infoData?.episode?.present, infoData?.episode?.last)}
          />
          <Table.row
            title={getTranslatedText('info.Rate')}
            data={infoData?.mal_score?.toString()}
            url={`${paths.list}/?mal_score=${infoData?.mal_score}`}
          />
          <Table.row
            title={getTranslatedText('info.Year')}
            data={infoData?.year?.toString()}
            url={`${paths.list}/?year=${infoData?.year}`}
          />
          <Table.row title={getTranslatedText('info.Genres')} data={infoData.genres} />
        </Table>
      </Section.Col>
    </Section>
  );
};

export default InfoBlock;

const episodesInfo = (present: string | null, last: number | null): string => {
  return `${present ? present : '? / '} ${last ? last : '?'}`;
};
