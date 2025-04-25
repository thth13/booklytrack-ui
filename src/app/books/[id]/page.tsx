'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import './style.css';
import { getBookById } from '@/src/lib/api';
import { useUserProfile } from '@/src/context/UserProfileContext';
import 'react-quill-new/dist/quill.snow.css';
import BookTabsPanel from '@/src/components/BookTabsPanel';
import BookInfoPanel from '@/src/components/BookInfoPanel';
import BookCategory from '@/src/components/BookCategory';

export default function BookPage() {
  const { id } = useParams();
  const router = useRouter();
  const { profile } = useUserProfile();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="book-page-container new-design">
      <div className="book-header">
        <button className="book-page-btn" onClick={() => router.push('/')}>
          <span className="material-icons">home</span>
        </button>
        <button className="book-page-btn" onClick={() => router.back()}>
          <span className="material-icons">back</span>
        </button>
      </div>
      <BookCategory book={book} profile={profile} />
      <div className="book-main-content new-main-content">
        <BookInfoPanel info={info} />
        <BookTabsPanel book={book} profile={profile} setBook={setBook} setLoading={setLoading} />
      </div>
    </div>
  );
}
