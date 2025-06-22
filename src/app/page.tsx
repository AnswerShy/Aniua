import { Card, Section } from '@/components/UI/UIComponents';
import FetchServiceInstance from '@/app/api';
import { i18n } from '@/utils/customUtils';
import { animeAPIConstant } from '@/constants/api-endpoints.constant';
import LastWatchedSection from '@/components/LastWatchedRow/LastWatched';

export default async function Home() {
  const communityChoice = await FetchServiceInstance.fetchHelper(animeAPIConstant['filter'], {
    to: 'out',
    params: { limit: '10', order: 'rating' },
  }).then((res) => res.titles as AnimeDataInterface[]);

  return (
    <>
      <Section>
        <LastWatchedSection />
        <Section.Row>
          <Section.Col title={i18n.t('home.Community choice')} widthState="1">
            <div
              style={{
                width: '100%',
                overflow: 'scroll hidden',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              {communityChoice.map((el, index) => (
                <Card key={index} image={el.poster} title={el.title} slug={el.slug}></Card>
              ))}
            </div>
          </Section.Col>
        </Section.Row>
      </Section>
    </>
  );
}
