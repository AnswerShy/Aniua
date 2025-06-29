'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/stores/user-profile-store';
import FetchServiceInstance from '@/app/api';
import toast from 'react-hot-toast';
import { getTranslatedText } from '@/utils';
import { userAPIConstant } from '@/constants/api-endpoints.constant';

const useUserProfile = () => {
  const userStoredData = useUserStore((state) => state.user);
  const setUserToStore = useUserStore((state) => state.setUser);
  const removeUserFromStore = useUserStore((state) => state.removeUser);
  const hydrated = useUserStore((state) => state.hydrated);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const setLoginState = useUserStore((state) => state.setLoginState);

  const fetchUserProfile = async () => {
    try {
      const data = await FetchServiceInstance.fetchHelper(userAPIConstant['profile'], {
        to: 'self',
        method: 'GET',
        cache: 'no-store',
      });

      if (data.success !== true) {
        console.log(`\n\n\t\tREMOVED BY STORAGE (while fetch)`);
        removeUserFromStore();
        return;
      }
      setUserToStore(data);
    } catch (error) {
      console.log(`\n\n\t\tREMOVED BY STORAGE (while trycatch)`);
      console.error(error);

      if (isLoggedIn) {
        toast.error(getTranslatedText('toast.fetchUserProfileError'));
      }

      removeUserFromStore();
    }
  };

  useEffect(() => {
    if (!hydrated) return;
    console.log(userStoredData.last_login);

    const lastLoginDate = new Date(userStoredData.last_login ?? 0).getTime();

    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;

    if (isLoggedIn && now - lastLoginDate > oneDayMs) {
      fetchUserProfile();
    }
  }, [hydrated]);

  return { userStoredData, setLoginState, fetchUserProfile };
};

export default useUserProfile;
