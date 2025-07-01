'use client';

import Pagination from '@/components/Pagination/Pagination';
import CardSkeleton from '@/components/UI/Card/CardSkeleton';
import { Card, CustomButton, Section } from '@/components/UI/UIComponents';
import useAnimeList from '@/hooks/useAnimeList';
import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';

function AnimeList({ initialData }: { initialData: AnimeDataInterface[] }) {
  const searchParams = useSearchParams();
  const queryString = useMemo(() => Object.fromEntries(searchParams), [searchParams.toString()]);
  const animeListData = useAnimeList(queryString, { initialData: initialData });

  return (
    <div>
      {animeListData.isLoad ? (
        <Section typeOfSection={'grid'}>
          <CardSkeleton countOfCards={15} />
        </Section>
      ) : (
        <Section typeOfSection={'grid'}>
          {animeListData.anime.map((el: AnimeDataInterface, index: number) => (
            <Card key={index} image={el.poster} title={el.title} slug={el.slug}></Card>
          ))}
        </Section>
      )}
      <Pagination
        moveLeftFunc={animeListData.handleLeft}
        moveRightFunc={animeListData.handleRight}
        isNextDisabled={animeListData.isEnd}
        isPrevDisabled={animeListData.page == 1}
      >
        {Array.from({ length: animeListData.listLength }).map((_, i) => (
          <CustomButton
            onClick={() => {
              animeListData.setPage(Number(i + 1));
            }}
            key={i}
            variant={animeListData.page == i + 1 ? 'primary' : 'secondary'}
          >
            {i + 1}
          </CustomButton>
        ))}
      </Pagination>
    </div>
  );
}

export default AnimeList;
