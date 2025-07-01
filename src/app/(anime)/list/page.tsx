import { Metadata } from 'next';
import Filters from './Components/Filters';
import { Section } from '@/components/UI/UIComponents';
import AnimeList from './Components/AnimeList';
import FetchServiceInstance from '@/app/api';
import { animeAPIConstant } from '@/constants/api-endpoints.constant';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Список аніме на Aniua',
    description: `Дивитись аніме на Aniua онлайн у високій якості`,
  };
}

const listPage = async () => {
  const initialData = (
    await FetchServiceInstance.fetchHelper(animeAPIConstant['list'], {
      params: { page: '1', limit: '15' },
      to: 'self',
      cache: 'force-cache',
    })
  ).titles as AnimeDataInterface[];

  return (
    <Section typeOfSection="TwoColSection" classname="justify-evenly">
      <Section.Col widthState="3/4">
        <AnimeList initialData={initialData} />
      </Section.Col>
      <Section.Col widthState="1/4">
        <Filters />
      </Section.Col>
    </Section>
  );
};

export default listPage;
