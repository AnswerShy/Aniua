'use client';

import {
  Card,
  CardStyles,
  CustomButton,
  Popover,
  Section,
  Tooltip,
} from '@/components/UI/UIComponents';
import React from 'react';

interface AnimeListProps {
  anime?: AnimeDataInterface[] | null;
}

function AnimeList({ anime }: AnimeListProps) {
  return (
    <>
      {anime == null ? null : (
        <Section typeOfSection={'grid'}>
          {anime.map((el: AnimeDataInterface) => (
            <Tooltip
              className={CardStyles.cardcontainer}
              role="tooltip"
              id={`anime_${el.slug}_tooltip`}
              key={el.slug}
              tooltipContent={<PopoverFilled animeData={el} />}
            >
              {' '}
              <Card
                aria-describedby={`anime_${el.slug}_tooltip`}
                key={el.slug}
                image={el.poster}
                title={el.title}
                slug={el.slug}
              />
            </Tooltip>
          ))}
        </Section>
      )}
    </>
  );
}

const PopoverFilled = ({ animeData }: { animeData: AnimeDataInterface }) => {
  return (
    <Popover>
      <Popover.Row variant="title">
        <h2>{animeData.title}</h2>
        <CustomButton variant="secondary">{animeData.mal_score} ⭐️</CustomButton>
      </Popover.Row>
      <Popover.Row variant="row">
        <span>{animeData.year}</span>
        <span>•</span>
        {Object.entries(animeData.genres).length > 0 ? (
          animeData.genres.map((el) => (
            <CustomButton variant="secondary" key={el.id}>
              {el.title}
            </CustomButton>
          ))
        ) : (
          <p>unknown genres (?)</p>
        )}
      </Popover.Row>
      <p>{animeData.description.slice(0, 100)}...</p>
    </Popover>
  );
};

export default AnimeList;
