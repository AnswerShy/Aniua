import { i18n } from '@/utils/customUtils';
import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

function useSearchHook() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AnimeDataInterface[] | string>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchDBSearch(query: string) {
    if (!query.trim()) return i18n.t('search.TypeSmt');

    const response = await fetch(`/api/search/?q=${query}`);
    if (!response.ok) {
      toast.error(i18n.t('toast.ServerError'));
      return i18n.t('toast.ServerError');
    }
    if (response.status === 404) return i18n.t('search.NoResults');

    const data = await response.json();
    return data;
  }

  const search = async (q: string) => {
    setIsLoading(true);

    try {
      const res = await fetchDBSearch(q);
      setResults(res);
    } catch (e) {
      setResults(i18n.t('toast.ServerError'));
      console.error(e);
    }

    setIsLoading(false);
  };

  const debouncedSearch = useCallback(
    debounce((q: string) => {
      if (!q.startsWith('/')) search(q);
    }, 500),
    [],
  );

  const onQueryChange = (val: string) => {
    setQuery(val);
    if (val.startsWith('/')) {
      setResults(i18n.t('search.SearchWithCommand'));
    } else {
      debouncedSearch(val);
    }
  };

  const onSearchSubmit = () => {
    search(query);
  };

  return { onSearchSubmit, onQueryChange, search, setQuery, query, results, isLoading };
}

export default useSearchHook;
