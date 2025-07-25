'use client';

import Pagination from '@/components/Pagination/Pagination';
import styles from './Player.module.css';
import { CustomButton, Dropdown, Typography } from '@/components/UI/UIComponents';
import { usePlayerSocket } from '@/hooks/usePlayerSocket';

import { handleEpisode } from '@/utils';
import clsx from 'clsx';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

const Player = ({
  playerState,
  setPlayerState,
  handleStudio,
  episodesList,
  room,
  classname,
  startW2G,
}: {
  playerState: playerStateInterface;
  setPlayerState: Dispatch<SetStateAction<playerStateInterface>>;
  handleStudio: (index: number) => void;
  episodesList: EpisodeListInterface[] | null;
  room?: string | null;
  classname?: string | null;
  startW2G?: () => void;
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

  const { setVideoUrl, videoUrl } = usePlayerSocket(
    room ? room : null,
    isIframeMounted ? frameRef.current : null,
  );

  useEffect(() => {
    if (playerState.episodeUrl) {
      setVideoUrl(playerState.episodeUrl);
    }
  }, [playerState.episodeUrl, setVideoUrl]);

  useEffect(() => {
    console.log(videoUrl);
  }, [videoUrl]);

  return (
    <div
      className={clsx(
        styles.playerContainer,
        `${classname}`,
        playerState.isPlayerLoading || !playerState.episodeUrl ? styles.playerLoad : null,
      )}
    >
      <EpisodeInfo
        episodeTitle={playerState.episodeTitle}
        episodeENTitle={playerState.episodeENTitle}
        episodeJPTitle={playerState.episodeJPTitle}
      />

      {playerState.episodeUrl ? (
        <div className={styles.playerWrapper}>
          <div className={styles.playerButtonsWrapper}>
            <StudioDropdown
              studiosList={playerState.studiosList}
              chooseStudio={playerState.chooseStudio}
              handleStudio={handleStudio}
            />
            {startW2G && <CustomButton onClick={startW2G}>W2G</CustomButton>}
          </div>
          <iframe
            ref={frameRef}
            allow="fullscreen"
            className={`${styles.playerFrame} ${!playerState.isPlayerLoading ? '' : styles.playerLoad}`}
            src={playerState.episodeUrl ? playerState.episodeUrl : undefined}
            onLoad={onIframeLoad}
          />
        </div>
      ) : null}

      {episodesList && (
        <EpisodeList
          episodesList={episodesList}
          playerState={playerState}
          setPlayerState={setPlayerState}
          chooseStudio={playerState.chooseStudio}
        />
      )}
    </div>
  );
};

export default Player;

const EpisodeInfo = ({
  episodeTitle,
  episodeENTitle,
  episodeJPTitle,
}: {
  episodeTitle: string | null;
  episodeENTitle: string | null;
  episodeJPTitle: string | null;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h2">{episodeTitle}</Typography>
      <Typography variant="h4">
        {episodeJPTitle}
        {episodeENTitle}
      </Typography>
    </div>
  );
};

const StudioDropdown = ({
  studiosList,
  chooseStudio,
  handleStudio,
}: {
  studiosList: string[];
  chooseStudio: number;
  handleStudio: (index: number) => void;
}) => {
  if (!studiosList || studiosList.length <= 1) return null;

  return (
    <Dropdown currentState={studiosList[chooseStudio]}>
      {studiosList.map((studio, index) => (
        <CustomButton key={index} onClick={() => handleStudio(index)}>
          {studio}
        </CustomButton>
      ))}
    </Dropdown>
  );
};

const EpisodeList = ({
  episodesList,
  playerState,
  setPlayerState,
  chooseStudio,
}: {
  episodesList: EpisodeListInterface[] | null;
  playerState: playerStateInterface;
  setPlayerState: Dispatch<SetStateAction<playerStateInterface>>;
  chooseStudio: number;
}) => {
  if (!episodesList || episodesList.length < 2) return null;
  return (
    <Pagination>
      {episodesList.map((element, index) => {
        const isCurrent = element.id === playerState.episodeID;
        const variant = isCurrent ? 'primary' : element.is_filler ? 'outline' : 'secondary';
        return (
          <CustomButton
            key={index}
            variant={variant}
            onClick={() =>
              handleEpisode({
                playerState: setPlayerState,
                id: episodesList[index].id,
                studio: chooseStudio,
                episodesList: episodesList[index],
                animeSlug: playerState.animeSlug,
              })
            }
          >
            {element.episode_number}
          </CustomButton>
        );
      })}
    </Pagination>
  );
};
