'use client';

import style from './SearchBar.module.css';
import { i18n } from '@/utils/customUtils';
import { useSearch } from '@/context/SearchContext';
import clsx from 'clsx';
import { TypographyType } from '../Shared/SharedComponents';

function SearchBar() {
  const { openSearchModal } = useSearch();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      // Open modal on Enter or Spacebar press
      openSearchModal();
    }
  };

  return (
    <>
      <input type="button" className={clsx(`${TypographyType['button'].className}`, style.searchbar)} aria-label={i18n.t('header.search')} onClick={openSearchModal} onKeyDown={handleKeyDown} value={i18n.t('header.search')} />
    </>
  );
}

export default SearchBar;
