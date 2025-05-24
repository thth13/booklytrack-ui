'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { addBookToUserLibrary, getRecentNotes, getProfile } from '@/src/lib/api';
import Cookies from 'js-cookie';
import { BookNotes, ReadCategory, UserProfile } from '../types';
import { useBook } from './BookContext';

interface UserProfileContextType {
  profile: UserProfile | null;
  recentNotes: BookNotes[];
  setRecentNotes: (notes: BookNotes[]) => void;
  fetchRecentNotes: (userId: string) => void;
  addBookToProfile: (bookId: string, userId: string, newCategory: ReadCategory, currentCategory?: ReadCategory) => void;
}

export const UserProfileContext = createContext<UserProfileContextType>({
  profile: null,
  recentNotes: [],
  setRecentNotes: () => {},
  fetchRecentNotes: () => {},
  addBookToProfile: () => {},
});

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recentNotes, setRecentNotes] = useState<BookNotes[]>([]);
  const { setCurrentCategory } = useBook();

  const fetchProfile = async (userId: string) => {
    const data = await getProfile(userId);
    setProfile(data);
  };

  const fetchRecentNotes = async (userId: string) => {
    const data = await getRecentNotes(userId);

    setRecentNotes(data);
  };

  const addBookToProfile = async (
    bookId: string,
    userId: string,
    newCategory: ReadCategory,
    currentCategory?: ReadCategory,
  ) => {
    const data = await addBookToUserLibrary(bookId, userId, newCategory, currentCategory);

    setCurrentCategory(newCategory);
    setProfile(data);
  };

  useEffect(() => {
    const userId = Cookies.get('userId');

    if (userId) {
      fetchProfile(userId);
      fetchRecentNotes(userId);
    }
  }, []);

  return (
    <UserProfileContext.Provider value={{ profile, addBookToProfile, recentNotes, setRecentNotes, fetchRecentNotes }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
