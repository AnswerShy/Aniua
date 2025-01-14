interface PlayerProps {
  episodesList: EpisodeListInterface[];
}

interface playerStateInterface {
  chooseStudio: number;
  studiosList: string[];
  episodeUrl: string | null;
  episodeENTitle: string | null;
  episodeTitle: string | null;
  episodeJPTitle: string | null;
  isPlayerLoading: boolean;
}
