'use client';

import styles from './Player.module.css';
import { CustomButton, Dropdown } from '@/components/Shared/SharedComponents';
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
  classname,
}: {
  playerState: playerStateInterface;
  setPlayerState: Dispatch<SetStateAction<playerStateInterface>>;
  handleStudio: (index: number) => void;
  episodesList: EpisodeListInterface[] | null;
  room?: string | null;
  classname?: string | null;
}) => {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const [isIframeMounted, setIsIframeMounted] = useState(false);

  const onIframeLoad = () => {
    if (frameRef.current?.contentWindow) {
      console.log('Iframe contentWindow is accessible');
      setIsIframeMounted(true);
    } else {
      console.error('Iframe contentWindow is not accessible');
      setIsIframeMounted(false);
    }
  };

  const { setVideoUrl, videoUrl } = usePlayerSocket(room ? room : null, isIframeMounted ? frameRef.current : null);

  useEffect(() => {
    if (playerState.episodeUrl) {
      setVideoUrl(playerState.episodeUrl);
    }
  }, [playerState.episodeUrl, setVideoUrl]);

  useEffect(() => {
    console.log(videoUrl);
  }, [videoUrl]);

  return episodesList ? (
    <div className={styles.playerContainer + ` ${classname}`}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>{i18next.language === 'uk' ? playerState.episodeTitle : playerState.episodeENTitle}</h1>
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
    </div>
  ) : (
    <div className={styles.playerContainer + ` ${classname}`}>
      <iframe
        ref={frameRef}
        className={`${styles.playerFrame} ${!playerState.isPlayerLoading ? '' : styles.playerLoad}`}
        src={undefined}
        onLoad={onIframeLoad}
      />
    </div>
  );
};

export default Player;
