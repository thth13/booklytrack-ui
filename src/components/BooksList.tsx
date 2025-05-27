import React from 'react';
import { Book } from '../types';
import Image from 'next/image';
import Link from '@/src/components/Link';

interface BooksListProps {
  book: Book;
}

const BooksList = ({ book }: BooksListProps) => (
  <Link
    href={`/books/${book.googleId}`}
    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex h-[140px] sm:h-[160px]"
  >
    {book.imageLinks.thumbnail && (
      <Image
        width={107}
        height={160}
        src={book.imageLinks.thumbnail}
        alt={book.title}
        className="w-[80px] sm:w-[107px] h-[140px] sm:h-[160px] object-cover"
      />
    )}

    <div className="flex-1 p-3 sm:p-4">
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-base sm:text-lg font-bold line-clamp-2">{book.title}</h3>
        <span className="text-gray-500 text-xs sm:text-sm shrink-0">
          {book.publishedDate
            ? typeof book.publishedDate === 'string'
              ? (book.publishedDate as string).match(/^\d{4}/)?.[0] || book.publishedDate
              : new Date(book.publishedDate).getFullYear()
            : '—'}
        </span>
      </div>
      <p className="text-blue-600 text-xs sm:text-sm mb-2 line-clamp-1">
        {book.authors ? book.authors.join(', ') : book.authors || '—'}
      </p>
    </div>
  </Link>
);

export default BooksList;
