'use client';

import React, { useContext, useEffect, useState } from 'react';
import { redirect, useParams, useRouter } from 'next/navigation';
import './style.css';
import { addBookToUserLibrary, getBookById } from '@/src/lib/api';
import { AuthContext } from '@/src/context/AuthContext';
import { useUserProfile } from '@/src/context/UserProfileContext';
import { ReadCategory } from '@/src/types';
import { getUserBookCategory } from '@/src/lib/utils';

export default function BookPage() {
  const { id } = useParams();
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const { profile } = useUserProfile();
  const userId = authContext?.userId;
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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
    if (!id) return;
    setLoading(true);
    getBookById(id as string)
      .then((data) => setBook(data))
      .catch(() => setBook(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!book || !profile) return;
    setCurrentCategory(getUserBookCategory(profile, book.id));
  }, [book, profile]);

  if (loading) return <div className="book-page-container">Loading...</div>;
  if (!book) return <div className="book-page-container">Book not found</div>;

  const info = book.volumeInfo;

  return (
    <div className="book-page-container">
      <div className="book-page-actions">
        <button className="book-page-btn" onClick={() => router.push('/')}>
          Home
        </button>
        <button className="book-page-btn" onClick={() => router.push('/books')}>
          Back
        </button>
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
      </div>
      <div className="book-details">
        {info.imageLinks?.smallThumbnail ? (
          <img src={info.imageLinks.smallThumbnail} alt={info.title} className="book-cover" />
        ) : (
          <div className="book-cover" />
        )}
        <div className="book-info">
          <h1 className="book-title">{info.title}</h1>
          <div className="book-authors">
            <strong>Авторы:</strong> {info.authors?.join(', ') || '—'}
          </div>
          <div className="book-publisher">
            <strong>Издатель:</strong> {info.publisher || '—'}
          </div>
          <div className="book-date">
            <strong>Год:</strong> {info.publishedDate || '—'}
          </div>
          <div className="book-description">{info.description || 'No description available.'}</div>
        </div>
      </div>
    </div>
  );
}
