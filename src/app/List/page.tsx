import { Metadata } from 'next';
import ListSectionLoader from './Components/ListSectionLoader';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Список аніме на Aniua',
    description: `Дивитись аніме на Aniua онлайн у високій якості`,
  };
}

const listPage = async () => {
  return (
    <>
      <ListSectionLoader></ListSectionLoader>
    </>
  );
};

export default listPage;
