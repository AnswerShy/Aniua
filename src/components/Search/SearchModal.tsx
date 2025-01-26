'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import style from './SearchModal.module.css';
import { i18n } from '@/utils/customUtils';
import debounce from 'lodash.debounce';
import Image from 'next/image';
import { Typography } from '../Shared/SharedComponents';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [results, setResults] = useState<AnimeDataInterface[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(
    debounce(async (query: string) => {
      setIsLoading(true);
      try {
        console.log(query);
        const response = await fetch(`/api/search/${query}`);
        if (!response.ok) {
          console.error('Failed to fetch search results');
          return;
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
      setIsLoading(false);
    }, 300),
    [],
  );

  useEffect(() => {
    if (isOpen) {
      const input = document.getElementById('modal-search-input');
      input?.focus();

      const outsideElements = document.querySelectorAll<HTMLElement>('body *:not(#modal):not(script):not(style)');
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
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
        <input
          id="modal-search-input"
          type="text"
          placeholder={i18n.t('header.search')}
          // value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="p-2 w-full rounded mb-4"
        />
        <div className="">
          {results.length > 0 ? (
            results.map((item: AnimeDataInterface, index: number) => (
              <div key={index} className="flex flex-row gap-4 items-center w-full p-2">
                <Image src={item.poster} alt={item.title_en} height={'125'} width={75} objectFit="cover" />
                <Typography variant="h2">
                  {item.title} / {item.title_en}
                </Typography>
              </div>
            ))
          ) : !isLoading ? (
            <p>{i18n.t('header.noResults')}</p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
