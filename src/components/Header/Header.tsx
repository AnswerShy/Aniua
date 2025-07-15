'use client';
import styles from './Header.module.css';

import { useState } from 'react';
import { CustomButton, Dropdown, ProfilePicture } from '../UI/UIComponents';
import clsx from 'clsx';

import { getTranslatedText } from '@/utils';
import { MenuIcon } from '@/utils/icons';
import useUserProfile from '@/hooks/useUserProfile';
import { getAccount, paths, pathsProfile } from '@/constants/headersconst';
import { SearchBar } from '../IndexComponent';
import React from 'react';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useSettingsStore } from '@/stores/settings-store';

export default function Header() {
  const [isMenuOpened, setMenuOpened] = useState(false);
  const { userStoredData } = useUserProfile();

  const hideHeader = useSettingsStore((state) => state.settings?.hide_header);
  const scrollingDown = useScrollDirection(!hideHeader);
  const shouldHideHeader = hideHeader && scrollingDown && !isMenuOpened;

  const menuHandler = () => {
    document.body.classList.toggle('body-shifted');
    setMenuOpened((prev) => !prev);
  };

  const menuHide = () => {
    document.body.classList.remove('body-shifted');
    setMenuOpened(false);
  };

  const objectToButtons = (obj: Record<string, string>, namespace = 'header') => {
    return Object.entries(obj).map(([key, action]) => (
      <CustomButton variant="link" url={action} key={key} hideMenu={menuHide}>
        {getTranslatedText(`${namespace}.${key}`)}
      </CustomButton>
    ));
  };

  const AccountBlock = userStoredData?.username
    ? ProfileBlock
    : () => <>{objectToButtons(getAccount, 'header')}</>;

  return (
    <header
      className={clsx(styles.header, shouldHideHeader ? '-translate-y-full' : '-translate-y-0')}
    >
      <nav className={styles.headerTop}>
        <MenuIcon
          onClick={() => {
            menuHandler();
          }}
        />
        <CustomButton variant="link" className="font-semibold" url={paths.home}>
          ANIUA
        </CustomButton>
        <CustomButton variant="link" url={paths.list}>
          {getTranslatedText(`paths.list`)}
        </CustomButton>
        <SearchBar handle={menuHide} />
        <div className="hidden md:flex ml-auto flex gap-[20px] items-center flex-row justify-center">
          <AccountBlock userStoredData={userStoredData} />
        </div>
      </nav>
      {/* SIDE MENU */}
      <nav className={clsx(!isMenuOpened ? styles.hidden : styles.sideMenu)}>
        <div className="w-full justify-between flex pt-2">
          <MenuIcon
            onClick={() => {
              menuHandler();
            }}
          />
          <SearchBar variant="icon" handle={menuHide} />
        </div>
        {objectToButtons({ ...paths, ...pathsProfile }, 'paths')}
        <div className="flex justify-between w-full mt-auto p-2">
          <AccountBlock userStoredData={userStoredData} />
        </div>
      </nav>
    </header>
  );
}

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
    <Dropdown customElement={<ProfilePicture avatar={userStoredData?.avatar} />} position="right">
      {Object.entries(pathsProfile).map((path, index) => (
        <CustomButton key={index} url={path[1]}>
          {getTranslatedText(`paths.${path[0]}`)}
        </CustomButton>
      ))}
    </Dropdown>
  </>
));
ProfileBlock.displayName = 'ProfileBlock';
