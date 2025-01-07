import { useEffect } from 'react';
import { useUserStore } from '@/stores/store';

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

    if (isLoggedIn && userStoredData?.username === '') {
      fetchUserProfile();
    } else if (!isLoggedIn && userStoredData.username) {
      removeUserFromStore();
    }
  }, [removeUserFromStore, setUserToStore, userStoredData.username, isLoggedIn, hydrated]);

  return userStoredData;
};

export default useUserProfile;
