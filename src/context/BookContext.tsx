'use client';

import React, { createContext, useContext, useState } from 'react';
import { ReadCategory } from '../types';

interface BookContextType {
  currentCategory: ReadCategory | null;
  setCurrentCategory: (category: ReadCategory | null) => void;
}

export const BookContext = createContext<BookContextType>({
  currentCategory: null,
  setCurrentCategory: () => {},
});

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCategory, setCurrentCategory] = useState<ReadCategory | null>(null);

  return <BookContext.Provider value={{ currentCategory, setCurrentCategory }}>{children}</BookContext.Provider>;
};

export const useBook = () => useContext(BookContext);
