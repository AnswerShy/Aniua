'use client';

import { animeCardInterface } from '@/interfaces/animeCardInterface';
import { Section, Card } from '@/components/UI/UIComponents';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

let page = 2;

const ListSectionLoader = () => {
  const { ref, inView } = useInView();
  const [anime, setAnime] = useState<animeCardInterface[]>([]);
  const [isEnd, setSsEnd] = useState(false);

  useEffect(() => {
    if (inView && !isEnd) {
      fetch(`/api/list?page=${page}`)
        .then((res) => res.json())
        .then((data: AnimeDataInterface[]) => {
          const transformedData = data.map((item) => ({
            ...item,
            episode: {
              ...item.episode,
              present: item.episode.present ?? 0,
            },
          }));
          setAnime((prev) => [...prev, ...(transformedData as animeCardInterface[])]);
          if (data.length < 18) setSsEnd(true);
          page++;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [inView, anime, isEnd]);

  return (
    <>
      <Section typeOfSection={'grid'}>
        {anime.map((el: animeCardInterface, index: number) => (
          <Card key={index} image={el.poster} title={el.title} slug={el.slug}></Card>
        ))}
      </Section>
      {isEnd ? <h1>END OF LIST</h1> : <div className="w-full h-10" ref={ref}></div>}
    </>
  );
};

export default ListSectionLoader;
