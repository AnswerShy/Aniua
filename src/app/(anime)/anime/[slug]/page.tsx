import Banner from '@/components/Banner/FullScreenBanner';
import InfoBlock from '../Components/AnimeDataSection/InfoBlock';
import { Metadata } from 'next';
import FetchServiceInstance from '@/app/api';
import PlayerProvider from '../Components/PlayerSection/PlayerProvider';
import { getTranslatedText } from '@/utils';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await FetchServiceInstance.fetchHelper(`api/anime/${slug}`, { to: 'self' });

  const language = 'uk';
  const title = language === 'uk' ? data.title : data.title_en;

  return {
    title: `${title} - Aniua | ${data.title_jp}`,
    description: `${getTranslatedText('description.anime', { anime: title })} \n ${data.description.split(' ').slice(0, 10).join(' ')}...`,
  };
}

export default async function AnimePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const data = (await FetchServiceInstance.fetchHelper(`api/anime/${slug}`, {
    to: 'self',
    cache: 'no-store',
  })) as AnimeDataInterface;
  const playerID = 'player-section';

  return (
    <>
      <Banner
        bannerImage={data.poster}
        bannerChar={data.background_image_url}
        bannerTitle={data.title}
        bannerJapaneese={data.title_jp}
        bannerDesc={data.description}
        bannerGenres={data.genres}
        bannerYear={data.year}
        playerID={playerID}
      />
      <InfoBlock infoData={data} playerID={playerID} />
      <PlayerProvider slug={slug} playerID={playerID} />
    </>
  );
}
