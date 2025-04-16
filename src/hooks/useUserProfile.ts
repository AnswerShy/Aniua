'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/stores/store';
import FetchServiceInstance from '@/app/api';
import toast from 'react-hot-toast';
import { i18n } from '@/utils/customUtils';

const useUserProfile = () => {
  const userStoredData = useUserStore((state) => state.user);
  const setUserToStore = useUserStore((state) => state.setUser);
  const removeUserFromStore = useUserStore((state) => state.removeUser);
  const hydrated = useUserStore((state) => state.hydrated);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const setLoginState = useUserStore((state) => state.setLoginState);

  const fetchUserProfile = async () => {
    try {
      const data = await FetchServiceInstance.fetchProfile();
      if (data.success !== true) {
        removeUserFromStore();
        console.log('success', data.success);
        return;
      }
      console.log('success', data.success, data.username);
      setUserToStore(data);
    } catch (error) {
      if (isLoggedIn) {
        toast.error(i18n.t('toast.fetchUserProfileError'));
        console.error('Error fetching user data:', error);
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
