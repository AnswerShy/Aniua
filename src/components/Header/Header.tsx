'use client';
import styles from './Header.module.css';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CustomButton, Dropdown } from '../UI/UIComponents';
import clsx from 'clsx';

import { getTranslatedText } from '@/utils/customUtils';
import { MenuIcon, Person } from '@/utils/icons';
import Image from 'next/image';
import useUserProfile from '@/hooks/useUserProfile';
import { paths, pathsProfile } from '@/constants/headersconst';
import { SearchBar } from '../IndexComponent';
import React from 'react';
import { useScrollDirection } from '@/hooks/useScrollDirection';

export default function Header() {
  const pathname = usePathname();
  const [currentPaths, setCurrentPath] = useState<string[] | []>([]);
  const [isMenuOpened, setMenuOpened] = useState(false);
  const scrollingDown = useScrollDirection(isMenuOpened);
  const { userStoredData } = useUserProfile();

  useEffect(() => {
    if (pathname.startsWith('/Anime/')) {
      const anime = pathname.slice(7).replaceAll('-', ' ');
      setCurrentPath(['List', anime]);
    } else {
      setCurrentPath(['List']);
    }
  }, [pathname]);

  const menuHandler = () => {
    document.body.classList.toggle('body-shifted');
    setMenuOpened((prev) => !prev);
  }; // Side menu handler for mobile

  return (
    <header className={clsx(styles.header, scrollingDown ? '-translate-y-full' : '-translate-y-0')}>
      <nav>
        <MenuIcon
          sx={{ fontSize: '30px' }}
          onClick={() => {
            menuHandler();
          }}
        />
        <CustomButton variant="link" className="font-semibold" url={`/`}>
          ANIUA
        </CustomButton>
        <Pathway ways={currentPaths} />
        <SearchBar />
        <div className="hidden md:flex ml-auto flex gap-[20px] items-center flex-row justify-center">
          {userStoredData?.username ? (
            <ProfileBlock userStoredData={userStoredData} />
          ) : (
            <GetAccBlock />
          )}
        </div>
      </nav>
      <nav className={clsx(!isMenuOpened ? styles.hidden : styles.sideMenu)}>
        <div className="w-full justify-between flex">
          <MenuIcon
            sx={{ fontSize: '30px' }}
            onClick={() => {
              menuHandler();
            }}
          />
          <SearchBar variant="icon" handle={menuHandler} />
        </div>
        {Object.entries(paths).map(([key, action]) => (
          <CustomButton variant="link" url={action} key={key} hideMenu={menuHandler}>
            {getTranslatedText('paths', key)}
          </CustomButton>
        ))}
        {Object.entries(pathsProfile).map(([key, action]) => (
          <CustomButton variant="link" url={action} key={key} hideMenu={menuHandler}>
            {getTranslatedText('paths', key)}
          </CustomButton>
        ))}
      </nav>
    </header>
  );
}

const Pathway = React.memo(({ ways }: { ways: string[] }) => (
  <div className={styles.pathway}>
    {ways.map((e, key) => (
      <React.Fragment key={key}>
        {ways.length > 1 && ways.length - 1 == key ? (
          <CustomButton variant="link" disabled>
            {getTranslatedText('paths', e)}
          </CustomButton>
        ) : (
          <CustomButton variant="link" url={`/${e}`}>
            {getTranslatedText('paths', e)}
          </CustomButton>
        )}
        {ways.length - 1 !== key && <span>/</span>}
      </React.Fragment>
    ))}
  </div>
));
Pathway.displayName = 'Pathway';

const GetAccBlock = React.memo(() => (
  <>
    <CustomButton variant="link" isAnimate={false} url="/registration">
      {getTranslatedText('header', 'Registration')}
    </CustomButton>
    <CustomButton variant="primary" isAnimate={false} url="/login">
      {getTranslatedText('header', 'Login')}
    </CustomButton>
  </>
));
GetAccBlock.displayName = 'GetAccBlock';

const ProfileBlock = React.memo(({ userStoredData }: { userStoredData: UserProfileInterface }) => (
  <>
    {/* <Dropdown currentState={userStoredData?.money?.toString()} isLeft={false}>
      {Object.entries(pathsMoney).map((path, index) => (
        <Dropdown.optionUrl
          key={index}
          href={path[1]}
          state={getTranslatedText('paths', path[0])}
        />
      ))}
    </Dropdown> */}
    <Dropdown customElement={<Avatar avatar={userStoredData?.avatar} />} position="right">
      {Object.entries(pathsProfile).map((path, index) => (
        <Dropdown.optionUrl
          key={index}
          href={path[1]}
          state={getTranslatedText('paths', path[0])}
        />
      ))}
    </Dropdown>
  </>
));
ProfileBlock.displayName = 'ProfileBlock';

const Avatar = ({ avatar }: { avatar?: string }) => {
  return (
    <div className="size-10 relative flex rounded-xl">
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
