import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserStateStore {
  user: UserProfileInterface;
  hydrated: boolean;
  isLoggedIn: boolean;
  setLoginState: (loggedIn: boolean) => void;
  setHydrated: (value: boolean) => void;
  setUser: (user: UserProfileInterface) => void;
  removeUser: () => void;
}

const defaultUser: UserProfileInterface = {
  id: 0,
  username: '',
  avatar: '',
  description: '',
  website: '',
  github: '',
  twitter: '',
  telegram: '',
  home: '',
  first_name: '',
  last_name: '',
  anime_name: '',
  money: 0,
  verified: false,
  date_joined: new Date(),
  last_login: new Date(),
  is_online: false,
  is_active: false,
  last_activity: new Date(),
  xp: 0,
  css: '',
  comments_count: 0,
  reviews_count: 0,
  achievements: [''],
  anime_lists: [''],
  success: false,
};

export const useUserStore = create<UserStateStore>()(
  devtools(
    persist(
      (set) => ({
        user: defaultUser,
        hydrated: false,
        isLoggedIn: false,
        setHydrated: (value: boolean) => set({ hydrated: value }),
        setLoginState: (loggedIn: boolean) => {
          localStorage.setItem('isLoggedIn', loggedIn ? 'true' : 'false');
          set({ isLoggedIn: loggedIn });
        },
        setUser: (user: UserProfileInterface) => {
          set({ user, isLoggedIn: true });
          localStorage.setItem('isLoggedIn', 'true');
        },
        removeUser: () => {
          set({ user: defaultUser, isLoggedIn: false });
          localStorage.setItem('isLoggedIn', 'false');
        },
      }),
      {
        name: 'userStore',
        onRehydrateStorage: () => (state) => {
          if (state && !state?.user) {
            state.user = defaultUser;
          }
          state?.setHydrated(true);
        },
      },
    ),
    {
      name: 'userStore',
    },
  ),
);
