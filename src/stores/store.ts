import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserStateStore {
  user: UserProfileInterface;
  hydrated: boolean;
  setHydrated: (value: boolean) => void,
  setUser: (user: UserProfileInterface) => void;
  removeUser: () => void;
}

const defaultUser: UserProfileInterface = {
  id: 0,
  username: "",
  avatar: "",
  description: "",
  website: "",
  github: "",
  twitter: "",
  telegram: "",
  home: "",
  first_name: "",
  last_name: "",
  anime_name: "",
  money: 0,
  verified: false,
  date_joined: new Date(),
  last_login: new Date(),
  is_online: false,
  is_active: false,
  last_activity: new Date(),
  xp: 0,
  css: "",
  comments_count: 0,
  reviews_count: 0,
  achievements: [""],
  anime_lists: [""],
  success: false,
}

export const useUserStore = create<UserStateStore>()(
  devtools(
    persist(
      (set) => ({
        user: defaultUser,
        hydrated: false,
        setHydrated: (value: boolean) => set({ hydrated: value }),
        setUser: (user: UserProfileInterface) => set({ user }),
        removeUser: () => set({ user: defaultUser }),
      }),
      {
        name: "userStore",
        onRehydrateStorage: () => (state) => {
          if (state && !state?.user) {
            state.user = defaultUser;
          }
          state?.setHydrated(true);
        },
      }
    ),
    {
      name: "userStore",
    }
  )
);
