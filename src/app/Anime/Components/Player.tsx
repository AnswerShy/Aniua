'use client';

import styles from './Player.module.css';
import { CustomButton, Dropdown, Typography } from '@/components/Shared/SharedComponents';
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

  return (
    <div className={styles.playerContainer + ` ${classname}`}>
      <EpisodeInfo episodeTitle={playerState.episodeTitle} episodeENTitle={playerState.episodeENTitle} episodeJPTitle={playerState.episodeJPTitle} />

      <div className={styles.playerWrapper}>
        <div className={styles.playerButtonsWrapper}>
          <StudioDropdown studiosList={playerState.studiosList} chooseStudio={playerState.chooseStudio} handleStudio={handleStudio} />
        </div>
        <iframe ref={frameRef} className={`${styles.playerFrame} ${!playerState.isPlayerLoading ? '' : styles.playerLoad}`} src={playerState.episodeUrl ? playerState.episodeUrl : undefined} onLoad={onIframeLoad} />
      </div>

      {episodesList && <EpisodeList episodesList={episodesList} setPlayerState={setPlayerState} chooseStudio={playerState.chooseStudio} />}
    </div>
  );
};

export default Player;

const EpisodeInfo = ({ episodeTitle, episodeENTitle, episodeJPTitle }: { episodeTitle: string | null; episodeENTitle: string | null; episodeJPTitle: string | null }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h2">{i18next.language === 'uk' ? episodeTitle : episodeENTitle}</Typography>
      <Typography variant="h3">{episodeJPTitle}</Typography>
    </div>
  );
};

const StudioDropdown = ({ studiosList, chooseStudio, handleStudio }: { studiosList: string[]; chooseStudio: number; handleStudio: (index: number) => void }) => {
  if (!studiosList || studiosList.length <= 1) return null;

  return (
    <Dropdown currentState={studiosList[chooseStudio]}>
      {studiosList.map((studio, index) => (
        <Dropdown.optionAction key={index} handleOptionSelectAction={() => handleStudio(index)} state={studio} />
      ))}
    </Dropdown>
  );
};

const EpisodeList = ({ episodesList, setPlayerState, chooseStudio }: { episodesList: EpisodeListInterface[] | null; setPlayerState: Dispatch<SetStateAction<playerStateInterface>>; chooseStudio: number }) => {
  if (!episodesList) return null;

  return (
    <div className={styles.episodeWrapper}>
      {episodesList.map((element, index) => (
        <CustomButton
          key={index}
          onClick={() =>
            handleEpisode({
              playerState: setPlayerState,
              id: episodesList[index].id,
              studio: chooseStudio,
              episodesList: episodesList[index],
            })
          }
        >
          {element.episode_number}
        </CustomButton>
      ))}
    </div>
  );
};
