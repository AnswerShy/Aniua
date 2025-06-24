import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  settings: UserSettings;
  setSetting: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: {
        chat_size: 'big',
      },
      setSetting: (key, value) =>
        set((state) => ({
          settings: {
            ...state.settings,
            [key]: value,
          },
        })),
      resetSettings: () => set({ settings: {} }),
    }),
    {
      name: 'localSettings',
    },
  ),
);
