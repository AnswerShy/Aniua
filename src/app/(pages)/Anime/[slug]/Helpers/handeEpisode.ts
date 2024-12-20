// Desc: Helper function to handle the episode change in the player component
import { Episode } from "@/models/fetchAnimePlayer";
import { Dispatch, SetStateAction } from "react";

async function handleEpisode(playerState: Dispatch<SetStateAction<playerStateInterface>>, id: number) {
  playerState((prevState) => ({ ...prevState, playerLoad: true }));
  const newEpisode = await Episode(id);
  playerState((prevState) => ({
    ...prevState,
    episodeUrl: newEpisode[0].videos[0].video_url,
    episodeTitle: newEpisode[0].title,
    episodeJPTitle: newEpisode[0].jp_title,
    playerLoad: false,
  }));
}

export default handleEpisode;
