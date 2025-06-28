'use client';

import FetchServiceInstance from '@/app/api';
import Pagination from '@/components/Pagination/Pagination';
import CardSkeleton from '@/components/UI/Card/CardSkeleton';
import { Card, CustomButton, Section } from '@/components/UI/UIComponents';
import { animeAPIConstant } from '@/constants/api-endpoints.constant';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function AnimeList() {
  const [page, setPage] = useState(1);
  const [anime, setAnime] = useState<AnimeDataInterface[]>([]);
  const [listLength, setLength] = useState(0);
  const searchParams = useSearchParams();
  const [isEnd, setEnd] = useState(false);
  const [isLoad, setLoad] = useState(false);

  const fetchMore = async () => {
    try {
      setLoad(true);
      const queryString = searchParams.toString();

      const moreAnime = (await FetchServiceInstance.fetchHelper(animeAPIConstant['list'], {
        params: { page: page.toString(), limit: '28', filter: queryString ?? '' },
        to: 'self',
        cache: 'no-store',
      })) as { page_count: number; titles: AnimeDataInterface[] };

      setLength(moreAnime.page_count);
      setAnime([...moreAnime.titles]);
      if (moreAnime.titles.length < 18) {
        setEnd(true);
      } else {
        setEnd(false);
      }
      setLoad(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMore();
  }, [page, searchParams.toString()]);

  const handleLeft = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleRight = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      {isLoad ? (
        <Section typeOfSection={'grid'}>
          <CardSkeleton countOfCards={28} />
        </Section>
      ) : (
        <Section typeOfSection={'grid'}>
          {anime.map((el: AnimeDataInterface, index: number) => (
            <Card key={index} image={el.poster} title={el.title} slug={el.slug}></Card>
          ))}
        </Section>
      )}
      <Pagination
        moveLeftFunc={handleLeft}
        moveRightFunc={handleRight}
        isNextDisabled={isEnd}
        isPrevDisabled={page == 1}
      >
        {Array.from({ length: listLength }).map((_, i) => (
          <CustomButton
            onClick={() => {
              setPage(Number(i + 1));
            }}
            key={i}
            variant={page == i + 1 ? 'primary' : 'secondary'}
          >
            {i + 1}
          </CustomButton>
        ))}
      </Pagination>
    </div>
  );
}

export default AnimeList;
