import { Book } from '../types';

export default function BookInfoPanel({ book }: { book: Book }) {
  return (
    <div className="book-info-panel">
      <div className="book-cover-block">
        {book.cover ? (
          <img src={book.cover} alt={book.title} className="book-cover-large" />
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
        <div className="book-date">{/* <span className="meta-label">Year:</span> {book.publishedDate || '—'} */}</div>
        <div
          className="book-description"
          dangerouslySetInnerHTML={{ __html: book.description || 'No description available.' }}
        />
      </div>
    </div>
  );
}
