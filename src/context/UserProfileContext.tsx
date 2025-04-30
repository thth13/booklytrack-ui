'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { addBookToUserLibrary, getProfile } from '@/src/lib/api';
import Cookies from 'js-cookie';
import { Book, ReadCategory, UserProfile } from '../types';
import { useBook } from './BookContext';

interface UserProfileContextType {
  profile: UserProfile | null;
  refreshProfile: () => Promise<void>;
  addBookToProfile: (book: Book, userId: string, newCategory: ReadCategory, currentCategory?: ReadCategory) => void;
}

export const UserProfileContext = createContext<UserProfileContextType>({
  profile: null,
  refreshProfile: async () => {},
  addBookToProfile: (book: Book, userId: string, newCategory: ReadCategory, currentCategory?: ReadCategory) => {},
});

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { setCurrentCategory } = useBook();

  const fetchProfile = async () => {
    const userId = Cookies.get('userId');

    if (userId) {
      const data = await getProfile(userId);
      setProfile(data);
    }
  };

  const addBookToProfile = async (
    book: Book,
    userId: string,
    newCategory: ReadCategory,
    currentCategory?: ReadCategory,
  ) => {
    const data = await addBookToUserLibrary(book, userId, newCategory, currentCategory);

    setCurrentCategory(newCategory);
    setProfile(data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <UserProfileContext.Provider value={{ profile, addBookToProfile, refreshProfile: fetchProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
