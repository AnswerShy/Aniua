'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/stores/store';
import FetchServiceInstance from '@/app/api';
import toast from 'react-hot-toast';
import { i18n } from '@/utils/customUtils';
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
        chache: 'no-store',
      });

      if (data.success !== true) {
        removeUserFromStore();
        return;
      }
      setUserToStore(data);
    } catch (error) {
      console.error(error);
      if (isLoggedIn) {
        toast.error(i18n.t('toast.fetchUserProfileError'));
      }
      removeUserFromStore();
    }
  };

  useEffect(() => {
    if (!hydrated) return;
    if (isLoggedIn) fetchUserProfile();
  }, [hydrated]);

  return { userStoredData, setLoginState, fetchUserProfile };
};

export default useUserProfile;
