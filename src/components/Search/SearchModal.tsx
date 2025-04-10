'use client';
import { useEffect, useRef, useState } from 'react';
import style from './SearchModal.module.css';
import { i18n } from '@/utils/customUtils';
import { Card } from '../Shared/SharedComponents';
import clsx from 'clsx';
import useSearchHook from '@/hooks/useSearch';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { onSearchSubmit, onQueryChange, results, isLoading } = useSearchHook();

  const modalRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
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
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 1000);
      return () => clearTimeout(timeout);
    }

    return () => {
      const outsideElements = document.querySelectorAll<HTMLElement>('body *:not(#modal):not(script):not(style)');
      outsideElements.forEach((el) => {
        el.removeAttribute('tabindex');
      });
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'Enter':
        await onSearchSubmit();
        break;
    }
  };

  return (
    <div
      ref={modalRef}
      className={clsx(style.modal, isOpen ? style.show : style.hide)}
      onKeyDown={handleKeyDown}
      // onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button className={style.close} onClick={onClose}>
        ESC ✖
      </button>
      <input id="modal-search-input" className={clsx(style.searchInput, 'p-2 w-full rounded mb-4')} type="text" placeholder={i18n.t('header.search')} onChange={(e) => onQueryChange(e.target.value)} onKeyDown={handleKeyDown} />
      <SearchResults results={results} isLoading={isLoading} click={onClose} />
    </div>
  );
}

type SearchResultsProps = {
  results: AnimeDataInterface[] | string;
  isLoading: boolean;
  click?: () => void;
};

export function SearchResults({ results, isLoading, click }: SearchResultsProps) {
  if (typeof results === 'string') return <p>{results}</p>;

  if (isLoading) return <p>Loading...</p>;
  if (!results || results.length === 0) return <p>No results found.</p>;

  return (
    <div onClick={click}>
      {results.map((item, i) => (
        <Card key={i} variant="horizontal" image={item.poster} title={item.title} slug={item.slug} additional={{ year: item.year, genres: item.genres }} />
      ))}
    </div>
  );
}
