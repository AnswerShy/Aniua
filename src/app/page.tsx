import FetchServiceInstance from '@/app/api';
import { animeAPIConstant } from '@/constants/api-endpoints.constant';
import HomeScreen from '@/components/Screens/Home/HomeScreen';

export default async function Home() {
  const communityChoice = await FetchServiceInstance.fetchHelper(animeAPIConstant['filter'], {
    to: 'out',
    params: { limit: '9', order: 'rating' },
  }).then((res) => res.titles as AnimeDataInterface[]);

  return <HomeScreen community={communityChoice} />;
}
