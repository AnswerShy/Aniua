import { Metadata } from 'next';
import PlayerProvider from '../../Components/PlayerSection/PlayerProvider';
import { i18n } from '@/utils/customUtils';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Room - Aniua`,
    description: i18n.t('description.anime'),
  };
}

export default async function AnimePage() {
  return (
    <>
      <PlayerProvider />
    </>
  );
}
