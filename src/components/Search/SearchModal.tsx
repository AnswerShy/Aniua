'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import style from './SearchModal.module.css';
import { i18n } from '@/utils/customUtils';
import debounce from 'lodash.debounce';
import Image from 'next/image';
import { CustomButton, Typography } from '../Shared/SharedComponents';
import clsx from 'clsx';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

async function fetchDBSearch(query: string) {
  if (!query.trim()) return 'Type something to search';

  const response = await fetch(`/api/search/?q=${query}`);

  if (!response.ok) {
    console.error('Failed to fetch search results');
    return;
  }

  if (response.status === 404) return 'No results found';
  const data = await response.json();
  console.log(data);
  return data;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [results, setResults] = useState<AnimeDataInterface[] | string>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState('');

  const handleSearch = useCallback(
    debounce(async (query: string) => {
      setIsLoading(true);

      try {
        if (query.startsWith('/')) return;
        if (!query.trim()) return;
        console.log(query);
        setResults(await fetchDBSearch(query));
      } catch (error) {
        console.error('Error fetching search results:', error);
      }

      setIsLoading(false);
    }, 500),
    [],
  );

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      const input = document.getElementById('modal-search-input');
      input?.focus();

      const outsideElements = document.querySelectorAll<HTMLElement>(
        'body *:not(#modal):not(script):not(style)', // *:has(tabindex)
      );
      outsideElements.forEach((el) => {
        if (!modalRef.current?.contains(el)) {
          el.setAttribute('tabindex', '-1');
        }
      });

      input?.focus();
    }

    return () => {
      const outsideElements = document.querySelectorAll<HTMLElement>('body *:not(#modal):not(script):not(style)');
      outsideElements.forEach((el) => {
        el.removeAttribute('tabindex');
      });
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'Enter':
        setResults(await fetchDBSearch(query));
        break;
    }
  };

  return (
    <div
      ref={modalRef}
      className={style.modal}
      onKeyDown={handleKeyDown}
      // onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button className={style.close} onClick={onClose}>
        ESC ✖
      </button>
      <div className={style.searchbar}>
        <input id="modal-search-input" className={clsx(style.searchInput, 'p-2 w-full rounded mb-4')} type="text" placeholder={i18n.t('header.search')} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} />
        <div className="">
          {typeof results === 'string' ? (
            <p>{results}</p>
          ) : results && results.length > 0 ? (
            results.map((item: AnimeDataInterface, index: number) => (
              <CustomButton key={index} classString="flex flex-row gap-4 items-center w-full p-2" url={`/Anime/${item.slug}`}>
                <Image src={item.poster} alt={item.title_en} height={125} width={75} objectFit="cover" />
                <Typography variant="h2">
                  {item.title} / {item.title_en}
                </Typography>
              </CustomButton>
            ))
          ) : !isLoading ? (
            <p>{i18n.t('header.noResults')}</p>
          ) : (
            <p>{i18n.t('header.search')}</p>
          )}
        </div>
      </div>
    </div>
  );
}
