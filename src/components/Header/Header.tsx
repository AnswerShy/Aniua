'use client';
import styles from './Header.module.css';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Dropdown } from '../Shared/SharedComponents';
import clsx from 'clsx';

import { getTranslatedText, TransitionLink } from '@/utils/customUtils';
import { MenuIcon, Person } from '@/utils/icons';
import Image from 'next/image';
import useUserProfile from '@/hooks/useUserProfile';
import { paths, pathsProfile } from '@/constants/headersconst';
import { SearchBar } from '../IndexComponent';

export default function Header() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState('');
  const [isMenuOpened, setMenuOpened] = useState(false);
  const [isScroll, setScroll] = useState(false);
  const userData = useUserProfile();

  const menuHandler = () => {
    setMenuOpened((prev) => !prev);
  }; // Side menu handler for mobile

  const changeColorOnScroll = () => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }; // Header scroll handler

  useEffect(() => {
    if (pathname === '/') {
      setCurrentPath('Home');
    } else if (pathname.slice(1).startsWith('Anime/')) {
      const anime = pathname.slice(7).replaceAll('-', ' ');
      setCurrentPath(anime);
    } else {
      setCurrentPath(pathname.slice(1));
    }
    changeColorOnScroll();
  }, [pathname]); // Load current path state

  return (
    <header>
      {/* Mobile Header */}
      <nav
        className={clsx(`${styles.headerMobile}`, isMenuOpened ? 'bg-c01dp' : 'bg-transparent01dp')}
        onClick={() => {
          menuHandler();
        }}
      >
        <MenuIcon sx={{ fontSize: '35px' }} />
        <div>{currentPath}</div>
      </nav>
      {/* Desktop Header */}
      <nav className={clsx(`${styles.headerDesktop}`, isScroll ? 'bg-c01dp' : 'bg-transparent')}>
        <div className={styles.leftHeader}>
          <TransitionLink className="font-semibold" url={`/`}>
            ANIUA
          </TransitionLink>
          {currentPath !== '' ? <Dropdown currentState={currentPath} actionList={paths} /> : null}
        </div>
        <div className={styles.rightHeader}>
          <SearchBar />
          {userData.username ? (
            <>
              <div>{userData?.money}/|\</div>
              <Dropdown actionList={pathsProfile} isLeft={false}>
                <div className="size-16 relative p-2 flex rounded-xl">
                  {userData?.avatar ? (
                    <div className="size-full relative">
                      <Image
                        src={userData.avatar}
                        className="w-full h-full rounded-xl"
                        fill
                        objectFit="cover"
                        alt="profile picture"
                      ></Image>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-transparent01dp rounded-xl">
                      <Person sx={{ fontSize: '2rem' }} />
                    </div>
                  )}
                </div>
              </Dropdown>
            </>
          ) : (
            <>
              <TransitionLink url={`/Registration`}>{getTranslatedText('header', 'Registration')}</TransitionLink>
              <TransitionLink url={`/Login`}>{getTranslatedText('header', 'Login')}</TransitionLink>
            </>
          )}
        </div>
      </nav>
      {/* Side Menu For Mobile */}
      <nav className={clsx(`${styles.sideMenu}`, isMenuOpened ? 'translate-x-0' : '-translate-x-full')}>
        <div className={`${styles.topMenu}`}>
          {Object.entries(paths).map(([key, action]) => (
            <TransitionLink url={action} key={key} isVision={menuHandler}>
              {getTranslatedText('paths', key)}
            </TransitionLink>
          ))}
          {Object.entries(pathsProfile).map(([key, action]) => (
            <TransitionLink url={action} key={key} isVision={menuHandler}>
              {getTranslatedText('paths', key)}
            </TransitionLink>
          ))}
        </div>
        <div className={`${styles.botMenu}`}>
          {userData.username ? (
            <>
              <div>{userData?.money}/|\</div>
              <TransitionLink
                url={'/Profile'}
                className="size-16 relative p-2 flex rounded-xl"
                isVision={menuHandler}
              >
                {userData?.avatar ? (
                  <div className="size-full relative">
                    <Image
                      src={userData.avatar}
                      className="w-full h-full rounded-xl"
                      fill
                      objectFit="cover"
                      alt="profile picture"
                    ></Image>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-transparent01dp rounded-xl">
                    <Person sx={{ fontSize: '2rem' }} />
                  </div>
                )}
              </TransitionLink>
            </>
          ) : (
            <>
              <TransitionLink url={`/Registration`}>{getTranslatedText('header', 'Registration')}</TransitionLink>
              <TransitionLink url={`/Login`}>{getTranslatedText('header', 'Login')}</TransitionLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
