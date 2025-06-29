import { Card, Section, Slider } from '@/components/UI/UIComponents';
import React from 'react';
import LastWatchedSection from './LastWatchedRow/LastWatched';
import { getTranslatedText } from '@/utils';

function HomeScreen({ community }: { community: AnimeDataInterface[] }) {
  return (
    <>
      <Section>
        <LastWatchedSection />
        <Section.Row>
          <Section.Col title={getTranslatedText(`home.Community choice`)} widthState="1">
            <Slider>
              {community.map((el, index) => (
                <Card key={index} image={el.poster} title={el.title} slug={el.slug}></Card>
              ))}
            </Slider>
          </Section.Col>
        </Section.Row>
      </Section>
    </>
  );
}

export default HomeScreen;
