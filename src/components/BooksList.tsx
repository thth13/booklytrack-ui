import React from 'react';
import './style.css';
import { Book } from '../types';
import Link from 'next/link';

interface BooksListProps {
  books: Book[];
}

export default function BooksList({ books }: BooksListProps) {
  return (
    <div className="book-list-container">
      <h3 className="book-list-title">Books</h3>
      <div className="book-list">
        {Array.isArray(books) && books.length > 0 ? (
          books.map((book: any) => {
            const bookId = book.id || book._id;
            return (
              <Link
                key={bookId || book.title}
                href={`/books/${bookId}`}
                className="book-list-item"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {book.smallThumbnail && <img src={book.smallThumbnail} alt={book.title} className="book-list-cover" />}
                {book.cover && <img src={book.cover} alt={book.title} className="book-list-cover" />}
                <div style={{ flex: 1 }}>
                  <h2 style={{ margin: 0 }}>{book.title}</h2>
                  {book.subtitle && (
                    <div style={{ fontStyle: 'italic', color: '#555', marginBottom: 4 }}>{book.subtitle}</div>
                  )}
                  <div>
                    <strong>Authors:</strong>{' '}
                    {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors || '—'}
                  </div>
                  <div>
                    <strong>Publisher:</strong> {book.publisher || '—'}
                  </div>
                  <div>
                    <strong>Year:</strong>{' '}
                    {book.publishedDate
                      ? typeof book.publishedDate === 'string'
                        ? book.publishedDate.match(/^\d{4}/)?.[0] || book.publishedDate
                        : new Date(book.publishedDate).getFullYear()
                      : '—'}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="book-list-empty-message">You don't have any books added yet</p>
        )}
      </div>
    </div>
  );
}
