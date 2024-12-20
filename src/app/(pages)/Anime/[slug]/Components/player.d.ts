interface PlayerProps {
  episodesList: EpisodeListInterface[];
}

interface playerStateInterface {
  chooseStudio: number;
  studiosList: string[];
  episodeUrl: string | null;
  episodeTitle: string;
  episodeJPTitle: string;
  isPlayerLoading: boolean;
}
