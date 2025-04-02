interface PlayerProps {
  episodesList: EpisodeListInterface[];
}

interface playerStateInterface {
  episodeID: number;
  chooseStudio: number;
  studiosList: string[];
  episodeUrl: string | null;
  episodeENTitle: string | null;
  episodeTitle: string | null;
  episodeJPTitle: string | null;
  isPlayerLoading: boolean;
}
