import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlayerSession {
  episodeID: number;
  studio: string;
}

interface PlayerStore {
  session: Record<string, PlayerSession>;
  setEpisode: (slug: string, data: PlayerSession) => void;
  getEpisode: (slug: string) => PlayerSession | undefined;
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      session: {},
      setEpisode: (slug, data) =>
        set((state) => ({
          session: {
            ...state.session,
            [slug]: data,
          },
        })),
      getEpisode: (slug) => get().session[slug],
    }),
    {
      name: 'player-session',
    },
  ),
);
