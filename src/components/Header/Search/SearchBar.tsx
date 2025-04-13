'use client';

import { i18n } from '@/utils/customUtils';
import { useSearch } from '@/context/SearchContext';
import { TextField } from '@/components/UI/UIComponents';
import { SearchIcon } from '@/utils/icons';

interface SearchBarProps {
  variant?: 'input' | 'icon';
  handle?: () => void;
}

function SearchBar({ variant = 'input', handle }: SearchBarProps) {
  const { openSearchModal } = useSearch();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      openSearchModal();
    }
  };

  return variant == 'input' ? (
    <>
      <TextField type="text" readonly aria-label={i18n.t('header.search')} onClick={openSearchModal} onKeyDown={handleKeyDown} value={i18n.t('header.search')} />
    </>
  ) : (
    <SearchIcon
      sx={{ fontSize: '30px' }}
      onClick={() => {
        openSearchModal();
        handle?.();
      }}
    />
  );
}

export default SearchBar;
