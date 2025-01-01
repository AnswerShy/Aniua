type Video = {
  studio: string;
  video_url: string;
  poster: string;
  date: string;
  subtitles: boolean;
  player: string;
};

interface PlayersInEpisode {
  studio: string;
  videos: Video[];
}

interface EpisodeListInterface {
  id: number;
  episode_number: number;
  title: {
    ua: string | null;
    en: string | null;
    jp: string | null;
  };
  poster: string;
  is_filler: boolean;
  recap: boolean;
  duration: number;
  rating: {
    likes: number;
    dislikes: number;
  };
  description: string;
  players: PlayersInEpisode[];
}
