import Image from 'next/image';
import { Book } from '../types';

export default function BookInfoPanel({ book }: { book: Book }) {
  return (
    <div className="book-info-panel">
      <div className="book-cover-block">
        {book.imageLinks?.thumbnail ? (
          <Image
            width={180}
            height={270}
            src={book.imageLinks?.thumbnail}
            alt={book.title}
            className="book-cover-large"
          />
        ) : (
          <div className="book-cover-large" />
        )}
      </div>
      <div className="book-meta">
        <h1 className="book-title">{book.title}</h1>
        <div className="book-authors">
          <span className="meta-label">Authors:</span> {book.authors?.join(', ') || '—'}
        </div>
        <div className="book-publisher">
          <span className="meta-label">Publisher:</span> {book.publisher || '—'}
        </div>
        <div className="book-date">
          <span className="meta-label">Year:</span>{' '}
          {book.publishedDate
            ? typeof book.publishedDate === 'string'
              ? (book.publishedDate as string).match(/^\d{4}/)?.[0] || book.publishedDate
              : new Date(book.publishedDate).getFullYear()
            : '—'}
        </div>
        <div
          className="book-description"
          dangerouslySetInnerHTML={{ __html: book.description || 'No description available.' }}
        />
      </div>
    </div>
  );
}
