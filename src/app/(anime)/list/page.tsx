import { Metadata } from 'next';
import { CustomButton, Section } from '@/components/UI/UIComponents';
import AnimeList from './Components/AnimeList';
import Pagination from '@/components/Pagination/Pagination';
import useAnimeList from '@/hooks/useAnimeList';
import Filters from './Components/Filters';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Список аніме на Aniua',
    description: `Дивитись аніме на Aniua онлайн у високій якості`,
  };
}

interface ListPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const listPage = async ({ searchParams }: ListPageProps) => {
  const filterQuery = await searchParams;
  const AnimeData = await useAnimeList(filterQuery);

  return (
    <Section typeOfSection="TwoColSection" classname="justify-evenly">
      <Section.Col widthState="3/4">
        <AnimeList anime={AnimeData.titles} />
        <Pagination isNextDisabled={!AnimeData.isNextPage} isPrevDisabled={!AnimeData.isPrevPage}>
          {Array.from({ length: AnimeData.pageCount }).map((_, i) => (
            <CustomButton
              url={AnimeData.createPageUrl(i + 1)}
              key={i}
              variant={AnimeData.page == i + 1 ? 'primary' : 'secondary'}
            >
              {i + 1}
            </CustomButton>
          ))}
        </Pagination>
      </Section.Col>
      <Section.Col widthState="1/4">
        <Filters />
      </Section.Col>
    </Section>
  );
};

export default listPage;
