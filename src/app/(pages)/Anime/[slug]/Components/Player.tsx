"use client";

import styles from "./Player.module.css";
import { CustomButton, Dropdown, Section } from "@/components/Shared/SharedComponents";
import { useEffect, useState } from "react";

import handleEpisode from "../Helpers/handeEpisode";

const Player = ({ episodesList }: PlayerProps) => {
  const [playerState, setPlayerState] = useState<playerStateInterface>({
    chooseStudio: 0,
    studiosList: [],
    episodeUrl: null,
    episodeTitle: "",
    episodeJPTitle: "",
    isPlayerLoading: false,
  });

  const handleStudio = (index: number) => setPlayerState((prevState) => ({ ...prevState, chooseStudio: index }));

  useEffect(() => {
    setPlayerState((prevState) => ({ ...prevState, isPlayerLoading: false }));
  }, [playerState.episodeUrl]);

  useEffect(() => {
    if (episodesList?.[0]?.id) {
      setPlayerState((prevState) => ({ ...prevState, studiosList: [] }));
      handleEpisode(setPlayerState, episodesList[0].id);
    } else {
      setPlayerState((prevState) => ({ ...prevState, episodeTitle: "Any player founded" }));
    }
  }, [episodesList]);

  return (
    <Section>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1>{playerState.episodeTitle}</h1>
        <h2>{playerState.episodeJPTitle}</h2>
      </div>
      <div className={styles.playerWrapper}>
        <div className={styles.playerButtonsWrapper}>
          {playerState.studiosList && playerState.studiosList.length > 1 ? (
            <Dropdown
              className={styles.playerButton}
              currentState={playerState.chooseStudio.toString()}
              assetsList={playerState.studiosList}
              changeState={handleStudio}
            />
          ) : null}
        </div>
        {!playerState.isPlayerLoading ? (
          <iframe className={styles.playerFrame} src={playerState.episodeUrl ? playerState.episodeUrl : undefined} />
        ) : (
          <div className={styles.playerFrame}>
            <h1>Loading...</h1>
          </div>
        )}
      </div>
      <div className={styles.episodeWrapper}>
        {episodesList.map((element, index) => (
          <CustomButton key={index} onClick={() => handleEpisode(setPlayerState, element.id)}>
            {element.episode_number}
          </CustomButton>
        ))}
      </div>
    </Section>
  );
};

export default Player;
