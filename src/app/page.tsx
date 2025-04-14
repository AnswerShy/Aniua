import { Card, Section } from '@/components/UI/UIComponents';
import FetchServiceInstance from '@/app/api';
import { i18n } from '@/utils/customUtils';

export default async function Home() {
  const communityChoice = await FetchServiceInstance.fetchCommunityChoice();

  return (
    <>
      <Section>
        <Section.Row>
          <Section.Col title={i18n.t('home.Explore new')} widthState="1">
            <div className="row-components">in backend dev</div>
          </Section.Col>
        </Section.Row>
        <Section.Row>
          <Section.Col title={i18n.t('home.Community choice')} widthState="3/4">
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
          <Section.Col title={i18n.t('home.Authors selections')} widthState="1/4">
            <div className="row-components">in backend dev</div>
          </Section.Col>
        </Section.Row>
      </Section>
      <Section>
        <Section.Row>
          <Section.Col title={i18n.t('home.Last clubs discussion')} widthState="1">
            <div className="row-components">in backend dev</div>
          </Section.Col>
        </Section.Row>
      </Section>
    </>
  );
}
