import React from 'react';
import './style.css';

interface UserBooksProps {
  books: any[];
}

const UserBooks: React.FC<UserBooksProps> = ({ books }) => (
  <div className="user-books">
    <h3 className="section-title">Books</h3>
    <div className="books-list">
      {Array.isArray(books) && books.length > 0 ? (
        books.map((book: any) => (
          <div key={book.id || book.title} className="books-list-item">
            {book.cover && <img src={book.cover} alt={book.title} className="books-list-cover" />}
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: 0 }}>{book.title}</h2>
              {book.subtitle && (
                <div style={{ fontStyle: 'italic', color: '#555', marginBottom: 4 }}>{book.subtitle}</div>
              )}
              <div>
                <strong>Authors:</strong> {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors || '—'}
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
          </div>
        ))
      ) : (
        <p className="empty-message">You don't have any books added yet</p>
      )}
    </div>
  </div>
);

export default UserBooks;
