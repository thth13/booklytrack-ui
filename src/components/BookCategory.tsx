'use client';

import { useContext, useEffect } from 'react';
import { Book, ReadCategory } from '../types';
import { AuthContext } from '../context/AuthContext';
import { getUserBookCategory } from '../lib/utils';
import { useUserProfile } from '../context/UserProfileContext';
import { useBook } from '../context/BookContext';

interface BookCategoryProps {
  book: Book;
}

export default function BookCategory({ book }: BookCategoryProps) {
  const authContext = useContext(AuthContext);
  const userId = authContext?.userId;
  const { profile, addBookToProfile } = useUserProfile();

  const { currentCategory, setCurrentCategory } = useBook();

  const handleAddBook = async () => {
    if (userId) {
      addBookToProfile(book._id, userId, ReadCategory.READING);
    }
  };

  const handleCategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = (e.target.value as ReadCategory) || null;

    if (userId && currentCategory) {
      addBookToProfile(book._id, userId, newCategory, currentCategory);
    }
  };

  useEffect(() => {
    if (!book || !profile) return;
    setCurrentCategory(getUserBookCategory(profile, book._id));
  }, [book, profile]);

  return (
    <>
      {!currentCategory && (
        <button className="book-page-btn add" onClick={handleAddBook}>
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
