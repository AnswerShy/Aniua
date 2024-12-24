import { Metadata } from 'next';
import { animeCardInterface } from '@/interfaces/animeCardInterface';
import { Section, Card } from '@/components/Shared/SharedComponents';
import ListSectionLoader from './Components/ListSectionLoader';
import AnimeServiceInstance from '@/app/api';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Список аніме на Aniua',
    description: `Дивитись аніме на Aniua онлайн у високій якості`,
  };
}

const listPage: React.FC<animeCardInterface> = async () => {
  const anime = await AnimeServiceInstance.fetchAnimeList();
  return (
    <>
      <Section typeOfSection={'grid'}>
        {anime.map((el: animeCardInterface, index: number) => (
          <Card key={index} image={el.poster} title={el.title} slug={el.slug}></Card>
        ))}
      </Section>
      <ListSectionLoader />
    </>
  );
};

export default listPage;
