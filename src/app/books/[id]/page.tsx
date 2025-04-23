'use client';

import React, { useContext, useEffect, useState } from 'react';
import { redirect, useParams, useRouter } from 'next/navigation';
import './style.css';
import { addBookToUserLibrary, getBookById } from '@/src/lib/api';
import { AuthContext } from '@/src/context/AuthContext';
import { useUserProfile } from '@/src/context/UserProfileContext';
import { ReadCategory } from '@/src/types';

export default function BookPage() {
  const { id } = useParams();
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const { profile } = useUserProfile();
  const userId = authContext?.userId;
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

      await addBookToUserLibrary(bookForBackend, userId);

      redirect('/');
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

  if (loading) return <div className="book-page-container">Loading...</div>;
  if (!book) return <div className="book-page-container">Book not found</div>;

  const info = book.volumeInfo;

  function getUserBookCategory(profile: any, bookId: string) {
    const categories = [ReadCategory.READING, ReadCategory.FINISHED, ReadCategory.WANTS_READ];
    for (const category of categories) {
      if (profile?.[category] && profile[category].some((id: string) => id === bookId)) {
        return category;
      }
    }
    return null;
  }

  const currentCategory = getUserBookCategory(profile, book.id);

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
          <select className="book-page-btn book-page-category-select" value={currentCategory}>
            <option value={ReadCategory.READING}>Reading</option>
            <option value={ReadCategory.FINISHED}>Finished</option>
            <option value={ReadCategory.WANTS_READ}>Wants to read</option>
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
