'use client';

import styles from './Player.module.css';
import { CustomButton, Dropdown, Section } from '@/components/Shared/SharedComponents';
import { usePlayerSocket } from '@/hooks/usePlayerSocket';

import { handleEpisode } from '@/utils/customUtils';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

const Player = ({
  playerState,
  setPlayerState,
  handleStudio,
  episodesList,
  room,
}: {
  playerState: playerStateInterface;
  setPlayerState: Dispatch<SetStateAction<playerStateInterface>>;
  handleStudio: (index: number) => void;
  episodesList: EpisodeListInterface[] | null;
  room: string | null;
}) => {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const { setVideoUrl } = usePlayerSocket(room, frameRef.current);
  useEffect(() => {
    if (playerState.episodeUrl) {
      setVideoUrl(playerState.episodeUrl);
    }
  }, [playerState.episodeUrl, setVideoUrl]);

  return (
    <Section>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
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
          <iframe
            ref={frameRef}
            className={styles.playerFrame}
            src={playerState.episodeUrl ? playerState.episodeUrl : undefined}
          />
        ) : (
          <div className={styles.playerFrame}>
            <h1>Loading...</h1>
          </div>
        )}
      </div>
      <div className={styles.episodeWrapper}>
        {episodesList &&
          episodesList.map((element, index) => (
            <CustomButton
              key={index}
              onClick={() => handleEpisode(setPlayerState, element.id, episodesList[index])}
            >
              {element.episode_number}
            </CustomButton>
          ))}
      </div>
    </Section>
  );
};

export default Player;
