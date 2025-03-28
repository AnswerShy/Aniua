'use client';
import styles from './Header.module.css';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CustomButton, Dropdown } from '../Shared/SharedComponents';
import clsx from 'clsx';

import { getTranslatedText } from '@/utils/customUtils';
import { MenuIcon, Person } from '@/utils/icons';
import Image from 'next/image';
import useUserProfile from '@/hooks/useUserProfile';
import { paths, pathsProfile, pathsMoney } from '@/constants/headersconst';
import { SearchBar } from '../IndexComponent';

export default function Header() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState('');
  const [isMenuOpened, setMenuOpened] = useState(false);
  const userData = useUserProfile();

  const menuHandler = () => {
    setMenuOpened((prev) => !prev);
  }; // Side menu handler for mobile

  useEffect(() => {
    if (pathname === '/') {
      setCurrentPath('Home');
    } else if (pathname.slice(1).startsWith('Anime/')) {
      const anime = pathname.slice(7).replaceAll('-', ' ');
      setCurrentPath(anime);
    } else {
      setCurrentPath(pathname.slice(1));
    }
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
      <nav className={clsx(`${styles.headerDesktop}`)}>
        <div className={styles.leftHeader}>
          <CustomButton className="font-semibold" url={`/`}>
            ANIUA
          </CustomButton>
          {currentPath !== '' ? (
            <Dropdown currentState={getTranslatedText('paths', currentPath)}>
              {Object.entries(paths).map((path, index) => {
                return <Dropdown.optionUrl key={index} href={path[1]} state={path[0]} />;
              })}
            </Dropdown>
          ) : null}
        </div>
        <div className={styles.rightHeader}>
          <SearchBar />
          {userData.username ? (
            <>
              <Dropdown currentState={userData?.money?.toString()} isLeft={false}>
                {Object.entries(pathsMoney).map((path, index) => {
                  return <Dropdown.optionUrl key={index} href={path[1]} state={path[0]} />;
                })}
              </Dropdown>
              <Dropdown customElement={<Avatar avatar={userData?.avatar} />} isLeft={false}>
                {Object.entries(pathsProfile).map((path, index) => {
                  return <Dropdown.optionUrl key={index} href={path[1]} state={path[0]} />;
                })}
              </Dropdown>
            </>
          ) : (
            <>
              <CustomButton url={`/Registration`}>{getTranslatedText('header', 'Registration')}</CustomButton>
              <CustomButton url={`/Login`}>{getTranslatedText('header', 'Login')}</CustomButton>
            </>
          )}
        </div>
      </nav>
      {/* Side Menu For Mobile */}
      <nav className={clsx(`${styles.sideMenu}`, isMenuOpened ? 'translate-x-0' : '-translate-x-full')}>
        <div className={`${styles.topMenu}`}>
          {Object.entries(paths).map(([key, action]) => (
            <CustomButton url={action} key={key} hideMenu={menuHandler}>
              {getTranslatedText('paths', key)}
            </CustomButton>
          ))}
          {Object.entries(pathsProfile).map(([key, action]) => (
            <CustomButton url={action} key={key} hideMenu={menuHandler}>
              {getTranslatedText('paths', key)}
            </CustomButton>
          ))}
        </div>
        <div className={`${styles.botMenu}`}>
          {userData.username ? (
            <>
              <div>{userData?.money}/|\</div>
              <CustomButton
                url={'/Profile'}
                className="size-16 relative p-2 flex rounded-xl"
                hideMenu={menuHandler}
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
              </CustomButton>
            </>
          ) : (
            <>
              <CustomButton url={`/Registration`}>{getTranslatedText('header', 'Registration')}</CustomButton>
              <CustomButton url={`/Login`}>{getTranslatedText('header', 'Login')}</CustomButton>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

const Avatar = ({ avatar }: { avatar?: string }) => {
  return (
    <div className="size-14 relative flex rounded-xl">
      {avatar ? (
        <div className="size-full relative">
          <Image
            src={avatar}
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
  );
};
