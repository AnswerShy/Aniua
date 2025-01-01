import { Card, Row, SubRow, Section, Typography } from '@/components/Shared/SharedComponents';
import AnimeServiceInstance from '@/app/api';
import { i18n } from '@/utils/customUtils';


export default async function Home() {
  const communityChoice = await AnimeServiceInstance.fetchCommunityChoice();
  console.log(i18n.t('home.Last uploaded episodes'))
  return (
    <>
      <Section>
        <Row>
          <SubRow title={i18n.t('home.Last uploaded episodes')} widthState="4/4">
            <Typography variant="h1">This is an H1 heading</Typography>
            <Typography variant="h2">This is an H2 heading</Typography>
            <Typography variant="h3">This is an H1 heading</Typography>
            <Typography variant="h4">This is an H4 heading</Typography>
            <Typography variant="body1">
              This is body text for your main content. Its readable and styled for comfortable reading.
            </Typography>
          </SubRow>
        </Row>
        <Row>
          <SubRow title={i18n.t('home.Community choice')} widthState="3/4">
            {communityChoice.map((el, index) => (
              <Card key={index} image={el.poster} title={el.title} slug={el.slug}></Card>
            ))}
          </SubRow>
          <SubRow title={i18n.t('home.Authors selections')} widthState="1/4">
            <div className="row-components">in backend dev</div>
          </SubRow>
        </Row>
      </Section>
      <Section>
        <Row>
          <SubRow title={i18n.t('home.Explore new')} widthState="4/4">
            <div className="row-components">in backend dev</div>
          </SubRow>
        </Row>
        <Row>
          <SubRow title={i18n.t('home.Last clubs discussion')} widthState="4/4">
            <div className="row-components">in backend dev</div>
          </SubRow>
        </Row>
      </Section>
    </>
  );
}
