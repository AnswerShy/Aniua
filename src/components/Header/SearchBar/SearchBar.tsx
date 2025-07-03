'use client';

import { getTranslatedText } from '@/utils';
import { TextField } from '@/components/UI/UIComponents';
import { SearchIcon } from '@/utils/icons';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  variant?: 'input' | 'icon';
  handle?: () => void;
}

function SearchBar({ variant = 'input', handle }: SearchBarProps) {
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      router.push('/search');
    }
  };

  return variant == 'input' ? (
    <>
      <TextField
        type="text"
        readonly
        aria-label={getTranslatedText('header.search')}
        onClick={() => {
          router.push('/search');
          handle?.();
        }}
        onKeyDown={handleKeyDown}
        value={getTranslatedText('header.search')}
      />
    </>
  ) : (
    <SearchIcon
      onClick={() => {
        router.push('/search');
        handle?.();
      }}
    />
  );
}

export default SearchBar;
