'use client';

import styles from './Player.module.css';
import { CustomButton, Dropdown, Section } from '@/components/Shared/SharedComponents';
import { usePlayerSocket } from '@/hooks/usePlayerSocket';

import { handleEpisode } from '@/utils/customUtils';
import i18next from 'i18next';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

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
  const [isIframeMounted, setIsIframeMounted] = useState(false);

  const onIframeLoad = () => {
    setIsIframeMounted(true);
  };

  const { setVideoUrl } = usePlayerSocket(room, isIframeMounted ? frameRef.current : null);

  useEffect(() => {
    if (playerState.episodeUrl) {
      setVideoUrl(playerState.episodeUrl);
    }
  }, [playerState.episodeUrl, setVideoUrl]);

  const language = i18next.language;
  const title = language === 'uk';

  return (
    <Section>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>{title ? playerState.episodeTitle : playerState.episodeENTitle}</h1>
        <h2>{playerState.episodeJPTitle}</h2>
      </div>
      <div className={styles.playerWrapper}>
        <div className={styles.playerButtonsWrapper}>
          {playerState.studiosList && playerState.studiosList.length > 0 ? (
            <Dropdown
              currentState={playerState.chooseStudio.toString()}
              assetsList={playerState.studiosList}
              changeState={handleStudio}
            />
          ) : null}
        </div>
        <iframe
          ref={frameRef}
          className={`${styles.playerFrame} ${!playerState.isPlayerLoading ? '' : styles.playerLoad}`}
          src={playerState.episodeUrl ? playerState.episodeUrl : undefined}
          onLoad={onIframeLoad}
        />
      </div>
      <div className={styles.episodeWrapper}>
        {episodesList &&
          episodesList.map((element, index) => (
            <CustomButton
              key={index}
              onClick={() =>
                handleEpisode({
                  playerState: setPlayerState,
                  id: episodesList[index].id,
                  studio: playerState.chooseStudio,
                  episodesList: episodesList[index],
                })
              }
            >
              {element.episode_number}
            </CustomButton>
          ))}
      </div>
    </Section>
  );
};

export default Player;
