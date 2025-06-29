import { Metadata } from 'next';
import PlayerProvider from '../../Components/PlayerSection/PlayerProvider';
import { getTranslatedText } from '@/utils';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Room - Aniua`,
    description: getTranslatedText('description.anime'),
  };
}

export default async function AnimePage() {
  return (
    <>
      <PlayerProvider />
    </>
  );
}
