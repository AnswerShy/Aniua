'use client';

import CardSkeleton from '@/components/UI/Card/CardSkeleton';
import { Card, Section } from '@/components/UI/UIComponents';
import React from 'react';

interface AnimeListProps {
  anime?: AnimeDataInterface[] | null;
}

function AnimeList({ anime }: AnimeListProps) {
  return (
    <div>
      {anime == null ? (
        <Section typeOfSection={'grid'}>
          <CardSkeleton countOfCards={15} />
        </Section>
      ) : (
        <Section typeOfSection={'grid'}>
          {anime.map((el: AnimeDataInterface) => (
            <Card key={el.slug} image={el.poster} title={el.title} slug={el.slug}></Card>
          ))}
        </Section>
      )}
    </div>
  );
}

export default AnimeList;
