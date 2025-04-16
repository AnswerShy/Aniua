'use client';

import { Section, Card } from '@/components/UI/UIComponents';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';
import FetchServiceInstance from '@/app/api';

const ListSectionLoader = () => {
  const { ref, inView } = useInView();
  const [anime, setAnime] = useState<AnimeDataInterface[]>([]);
  const [isEnd, setIsEnd] = useState(false);
  const pageRef = useRef(1);

  useEffect(() => {
    if (inView && !isEnd) {
      const fetchMore = async () => {
        try {
          const moreAnime = await FetchServiceInstance.fetchAnimeList(pageRef.current);
          setAnime((prev) => [...prev, ...moreAnime]);
          if (moreAnime.length < 18) setIsEnd(true);
          pageRef.current++;
        } catch (err) {
          console.error(err);
        }
      };

      fetchMore();
    }
  }, [inView, anime, isEnd]);

  return (
    <>
      <Section typeOfSection={'grid'}>
        {anime.map((el: AnimeDataInterface, index: number) => (
          <Card key={index} image={el.poster} title={el.title} slug={el.slug}></Card>
        ))}
      </Section>
      {isEnd ? <h2>END OF LIST</h2> : <div className="w-full h-10" ref={ref}></div>}
    </>
  );
};

export default ListSectionLoader;
