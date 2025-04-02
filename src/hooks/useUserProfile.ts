import { useEffect } from 'react';
import { useUserStore } from '@/stores/store';
import AnimeServiceInstance from '@/app/api';
import toast from 'react-hot-toast';
import { i18n } from '@/utils/customUtils';

const useUserProfile = () => {
  const userStoredData = useUserStore((state) => state.user);
  const setUserToStore = useUserStore((state) => state.setUser);
  const removeUserFromStore = useUserStore((state) => state.removeUser);
  const hydrated = useUserStore((state) => state.hydrated);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!hydrated) return;

    const fetchUserProfile = async () => {
      try {
        const data = await AnimeServiceInstance.fetchProfile();
        if (data.success !== 'true') {
          removeUserFromStore();
        }
        setUserToStore(data);
      } catch (error) {
        if (isLoggedIn) {
          toast.error(i18n.t('toast.fetchUserProfileError'));
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserProfile();
  }, [removeUserFromStore, setUserToStore, userStoredData.username, isLoggedIn, hydrated]);

  return userStoredData;
};

export default useUserProfile;
