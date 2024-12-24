import { useEffect } from 'react';
import { isLoggined } from '@/utils/customUtils';
import { useUserStore } from '@/stores/store';

const useUserProfile = () => {
  const userStoredData = useUserStore((state) => state.user);
  const setUserToStore = useUserStore((state) => state.setUser);
  const removeUserFromStore = useUserStore((state) => state.removeUser);
  const hydrated = useUserStore((state) => state.hydrated);
  const userToken: string | boolean = isLoggined();

  useEffect(() => {
    if (!hydrated) return;

    const fetchUserProfile = async () => {
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          setUserToStore(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (userToken && userStoredData?.username === '') {
      console.log('fetching user profile');
      fetchUserProfile();
    } else if (!userToken && userStoredData.username) {
      removeUserFromStore();
    }
  }, [removeUserFromStore, setUserToStore, userStoredData.username, userToken, hydrated]);

  return userStoredData;
};

export default useUserProfile;
