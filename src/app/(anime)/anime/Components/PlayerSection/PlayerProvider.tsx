'use client';

import Player from './Player';
import { usePlayer } from '@/hooks/usePlayer';
import { Chat } from '@/components/IndexComponent';
import { Section } from '@/components/UI/UIComponents';
import { SocketProvider } from '@/context/SocketContext';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { i18n } from '@/utils/customUtils';

const PlayerProvider = ({ slug, playerID }: { slug?: string; playerID?: string }) => {
  const { playerState, setPlayerState, handleStudio, episodesList } = usePlayer(slug ?? null);

  const searchParams = useSearchParams();
  const codeOfRoom = searchParams.get('room') || '';
  // For future features
  // const timingStart = searchParams.get('s') || '';

  const reloadWithRoom = useCallback(() => {
    const newRoom = Math.random().toString(36).substring(2, 8);
    const url = new URL(window.location.href);
    url.searchParams.set('room', newRoom);
    const newUrl = url.toString();

    navigator.clipboard
      .writeText(newUrl)
      .then(() => {
        localStorage.setItem('roomLinkCopied', 'true');
        window.location.href = newUrl;
      })
      .catch(() => {
        toast.error(i18n.t('toast.copy_error') || 'Failed to copy link');
        window.location.href = newUrl;
      });
  }, []);

  useEffect(() => {
    if (codeOfRoom) {
      setTimeout(() => {
        document.getElementById('player-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }

    if (localStorage.getItem('roomLinkCopied') === 'true') {
      toast.success(i18n.t('toast.copied'));
      localStorage.removeItem('roomLinkCopied');
    }
  }, []);

  return (
    <>
      {codeOfRoom ? (
        <SocketProvider>
          <Section typeOfSection="TwoColSection" id={playerID}>
            <Player
              playerState={playerState}
              setPlayerState={setPlayerState}
              handleStudio={handleStudio}
              episodesList={episodesList}
              room={codeOfRoom}
              classname={codeOfRoom && 'layer1'}
            />
            <Chat />
          </Section>
        </SocketProvider>
      ) : (
        <Section typeOfSection="OneColSection" id={playerID}>
          <Player
            startW2G={reloadWithRoom}
            playerState={playerState}
            setPlayerState={setPlayerState}
            handleStudio={handleStudio}
            episodesList={episodesList}
            room={codeOfRoom}
          />
        </Section>
      )}
    </>
  );
};

export default PlayerProvider;
