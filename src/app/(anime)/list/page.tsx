import { Metadata } from 'next';
import Filters from './Components/Filters';
import { Section } from '@/components/UI/UIComponents';
import AnimeList from './Components/AnimeList';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Список аніме на Aniua',
    description: `Дивитись аніме на Aniua онлайн у високій якості`,
  };
}

const listPage = async () => {
  return (
    <Section typeOfSection="TwoColSection" classname="justify-evenly">
      <Section.Col widthState="3/4">
        <AnimeList />
      </Section.Col>
      <Section.Col widthState="1/4">
        <Filters />
      </Section.Col>
    </Section>
  );
};

export default listPage;
