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
          books.map((book: Book) => {
            return (
              <Link
                key={book.googleId}
                href={`/books/${book.googleId}`}
                className="book-list-item"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {book.imageLinks.smallThumbnail && (
                  <img src={book.imageLinks.smallThumbnail} alt={book.title} className="book-list-cover" />
                )}
                <div style={{ flex: 1 }}>
                  <h2 style={{ margin: 0 }}>{book.title}</h2>
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
                        ? (book.publishedDate as string).match(/^\d{4}/)?.[0] || book.publishedDate
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
