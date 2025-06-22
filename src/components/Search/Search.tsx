import React from 'react';
import { i18n } from '@/utils/customUtils';
import useSearchHook from '@/hooks/useSearch';
import { Card, TextField } from '../UI/UIComponents';

function Search() {
  const { onSearchSubmit, onQueryChange, results, isLoading, query } = useSearchHook();

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'Enter':
        await onSearchSubmit();
        break;
    }
  };

  return (
    <>
      <TextField
        value={query}
        type="text"
        placeholder={i18n.t('header.search')}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SearchResults results={results} isLoading={isLoading} />
    </>
  );
}

type SearchResultsProps = {
  results: AnimeDataInterface[] | string;
  isLoading: boolean;
  click?: () => void;
};

export function SearchResults({ results, isLoading, click }: SearchResultsProps) {
  if (isLoading) return <p>Loading...</p>;
  if (typeof results === 'string') return <p>{results}</p>;
  if (!results || results.length === 0) return <p>No results found.</p>;

  return (
    <div onClick={click}>
      {results.map((item, i) => (
        <Card
          key={i}
          variant="horizontal"
          image={item.poster}
          title={item.title}
          slug={item.slug}
          additional={{ year: item.year, genres: item.genres }}
        />
      ))}
    </div>
  );
}

export default Search;
