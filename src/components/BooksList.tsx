import React from 'react';
import { Book } from '../types';
import Link from 'next/link';
import Image from 'next/image';

interface BooksListProps {
  book: Book;
}

const BooksList = ({ book }: BooksListProps) => (
  <Link
    href={`/books/${book.googleId}`}
    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex h-[160px]"
  >
    {book.imageLinks.thumbnail && (
      <Image
        width={107}
        height={160}
        src={book.imageLinks.thumbnail}
        alt={book.title}
        className="w-[107px] h-[160px] object-cover"
      />
    )}

    <div className="flex-1 p-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold">{book.title}</h3>
        <span className="text-gray-500 text-sm">
          {book.publishedDate
            ? typeof book.publishedDate === 'string'
              ? (book.publishedDate as string).match(/^\d{4}/)?.[0] || book.publishedDate
              : new Date(book.publishedDate).getFullYear()
            : '—'}
        </span>
      </div>
      <p className="text-blue-600 text-sm mb-2">{book.authors ? book.authors.join(', ') : book.authors || '—'}</p>
      {/* <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        An easy and proven way to build good habits and break bad ones. A practical guide to transform your habits and
        get 1% better every day.
      </p>
      <div className="flex space-x-3">
        <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition-colors">
          Add to Reading List
        </button>
      </div> */}
    </div>
  </Link>
);

export default BooksList;
