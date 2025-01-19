import { Metadata } from 'next';
import PlayerProvider from '../../Components/PlayerProvider';
import { i18n } from '@/utils/customUtils';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Room - Aniua`,
    description: i18n.t('description.anime'),
  };
}

export default async function AnimePage({ params }: { params: { roomCode: string } }) {
  const { roomCode } = await params;
  console.log(roomCode);
  return (
    <>
      <PlayerProvider room={roomCode} />
    </>
  );
}
