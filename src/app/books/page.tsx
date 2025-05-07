'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './style.css';
import { searchBooks } from '@/src/lib/api';
import BooksList from '@/src/components/BooksList';
import { Book } from '@/src/types';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function FindBooksPage() {
  const [query, setQuery] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('books_query') || '';
    }
    return '';
  });
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('books_query', query);
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
          googleId: item.id || '',
          title: item.volumeInfo.title || '',
          subtitle: item.volumeInfo.subtitle || '',
          authors: item.volumeInfo.authors || [],
          publisher: item.volumeInfo.publisher || '',
          publishedDate: item.volumeInfo.publishedDate || '',
          description: item.volumeInfo.description || '',
          imageLinks: item.volumeInfo.imageLinks || '',
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
    <>
      <Header />
      <main className="pt-20 min-h-[800px] bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          <section id="search-section" className="mb-8">
            <div className="flex items-center space-x-4 bg-white rounded-2xl p-4 shadow-sm">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search for books, authors, or ISBN..."
                className="flex-1 outline-none text-lg"
                value={query}
                onChange={handleSearch}
              />

              <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>
          </section>
          <section className="space-y-4">
            {loading && <div>Loading...</div>}
            {!loading && books.length === 0 && query && <div style={{ color: '#888' }}>Books not found</div>}
            {books.map((book) => (
              <BooksList key={book.googleId} book={book} />
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
