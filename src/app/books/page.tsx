'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './style.css';
import { searchBooks } from '@/src/lib/api';
import BooksList from '@/src/components/BooksList';
import { Book } from '@/src/types';

export default function FindBooksPage() {
  const [query, setQuery] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('books_query') || '';
    }
    return '';
  });
  const [books, setBooks] = useState<Book[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('books_list');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Debounce logic
  useEffect(() => {
    // Save to sessionStorage on change
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('books_query', query);
      sessionStorage.setItem('books_list', JSON.stringify(books));
    }
  }, [query, books]);

  useEffect(() => {
    if (query.trim() === '') {
      setBooks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const handler = setTimeout(async () => {
      try {
        const items = await searchBooks(query);
        const mappedBooks: Book[] = items.map((item: any) => ({
          id: item.id || '',
          title: item.volumeInfo.title || '',
          subtitle: item.volumeInfo.subtitle || '',
          authors: item.volumeInfo.authors || [],
          publisher: item.volumeInfo.publisher || '',
          publishedDate: item.volumeInfo.publishedDate || '',
          description: item.volumeInfo.description || '',
          smallThumbnail: item.volumeInfo.imageLinks?.smallThumbnail || '',
        }));
        setBooks(mappedBooks);
      } catch (err) {
        setBooks([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="books-page-container">
      <div className="books-page-actions">
        <button className="books-page-btn" onClick={() => router.push('/')}>
          Home
        </button>
      </div>
      <input
        type="text"
        placeholder="Searching books..."
        value={query}
        onChange={handleSearch}
        className="books-search-input"
      />

      <div>
        {loading && <div>Loading...</div>}
        {!loading && books.length === 0 && query && <div style={{ color: '#888' }}>Books not found</div>}
        <BooksList books={books} />
      </div>
    </div>
  );
}
