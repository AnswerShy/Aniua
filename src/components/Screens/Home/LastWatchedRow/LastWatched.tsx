'use client';

import { useEffect, useState } from 'react';
import { usePlayerStore } from '@/stores/playerHistory';
import { Card, Section, Slider } from '@/components/UI/UIComponents';
import FetchServiceInstance from '@/app/api';
import { animeAPIConstant } from '@/constants/api-endpoints.constant';
import { getTranslatedText } from '@/utils';

export default function LastWatchedSection() {
  const session = usePlayerStore((state) => state.session);
  const [animeList, setAnimeList] = useState<AnimeDataInterface[]>([]);

  useEffect(() => {
    const slugs = Object.keys(session).slice(-10).reverse().join(',');
    if (slugs.length === 0) return;

    const fetchAnime = async () => {
      const res = await FetchServiceInstance.fetchHelper(animeAPIConstant['filter'], {
        to: 'out',
        params: {
          slug: `${slugs},`,
        },
      });

      const data = res.titles;
      setAnimeList(data);
      if (res.ok) {
      } else {
        console.warn('fetch failed');
      }
    };

    console.log(session, slugs);
    fetchAnime();
  }, [session]);

  if (animeList.length === 0) return null;

  return (
    <Section.Row>
      <Section.Col title={getTranslatedText('home.Last watched')} widthState="1">
        <Slider>
          {animeList.map((el, idx) => (
            <Card key={idx} image={el.poster} title={el.title} slug={el.slug} />
          ))}
        </Slider>
      </Section.Col>
    </Section.Row>
  );
}
