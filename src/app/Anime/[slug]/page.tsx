import Banner from '@/components/Banner/FullScreenBanner';
import InfoBlock from '@/components/InfoBlock/InfoBlock';
import { Metadata } from 'next';
import AnimeServiceInstance from '@/app/api';
import PlayerProvider from '../Components/PlayerProvider';
import { i18n } from '@/utils/customUtils';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const data = await AnimeServiceInstance.fetchAnimeInfo(slug);

  const language = i18n.language;
  const title = language === 'uk' ? data.title : data.title_en;

  return {
    title: `${title} - Aniua`,
    description: i18n.t('description.anime', { anime: title }),
  };
}

export default async function AnimePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const data = await AnimeServiceInstance.fetchAnimeInfo(slug);

  return (
    <>
      <Banner bannerImage={data.poster} bannerTitle={data.title} bannerDesc={data.description} bannerGenres={data.genres} bannerYear={data.year} />
      <InfoBlock infoData={data} />
      <PlayerProvider slug={slug} />
    </>
  );
}
