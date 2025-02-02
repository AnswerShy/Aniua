'use client';

import style from './SearchBar.module.css';
import { i18n } from '@/utils/customUtils';
import { useSearch } from '@/context/SearchContext';

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
      <input
        type="button"
        tabIndex={0}
        className={style.searchbar}
        aria-label={i18n.t('header.search')}
        onClick={openSearchModal}
        onKeyDown={handleKeyDown}
        value={i18n.t('header.search')}
      />
    </>
  );
}

export default SearchBar;
