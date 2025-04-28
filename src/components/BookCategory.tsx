'use client';

import { useContext, useEffect, useState } from 'react';
import { ReadCategory } from '../types';
import { AuthContext } from '../context/AuthContext';
import { addBookToUserLibrary } from '../lib/api';
import { redirect } from 'next/navigation';
import { getUserBookCategory } from '../lib/utils';
import { useUserProfile } from '../context/UserProfileContext';

interface BookCategoryProps {
  book: any;
}

export default function BookCategory({ book }: BookCategoryProps) {
  const authContext = useContext(AuthContext);
  const userId = authContext?.userId;
  const { profile } = useUserProfile();

  const [currentCategory, setCurrentCategory] = useState<ReadCategory | null>(null);

  const addBook = async () => {
    if (userId) {
      const bookForBackend = {
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        authors: book.volumeInfo.authors,
        cover: book.volumeInfo.imageLinks.smallThumbnail,
        googleId: book.id,
        categories: book.volumeInfo.categories,
        publisher: book.volumeInfo.publisher,
        publishedDate: new Date(book.volumeInfo.publishedDate),
      };

      await addBookToUserLibrary(bookForBackend, userId, ReadCategory.READING);

      redirect('/');
    }
  };

  const handleCategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = (e.target.value as ReadCategory) || null;

    if (userId && currentCategory) {
      await addBookToUserLibrary(book, userId, newCategory, currentCategory);
      setCurrentCategory(newCategory);
    }
  };

  useEffect(() => {
    if (!book || !profile) return;
    setCurrentCategory(getUserBookCategory(profile, book.id));
  }, [book, profile]);

  return (
    <>
      {!currentCategory && (
        <button className="book-page-btn add" onClick={addBook}>
          Add book
        </button>
      )}
      {currentCategory && (
        <select
          className="book-page-btn book-page-category-select"
          value={currentCategory}
          onChange={handleCategoryChange}
        >
          <option value={ReadCategory.READING}>Reading</option>
          <option value={ReadCategory.FINISHED}>Finished</option>
          <option value={ReadCategory.WANTS_READ}>Wants to read</option>
          <option value="">Delete from library</option>
        </select>
      )}
    </>
  );
}
