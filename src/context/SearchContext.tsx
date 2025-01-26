'use client';

import { SearchModal } from '@/components/IndexComponent';
import { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  isSearchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  return (
    <SearchContext.Provider value={{ isSearchModalOpen, openSearchModal, closeSearchModal }}>
      {children}
      <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
