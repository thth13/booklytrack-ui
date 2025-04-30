import React from 'react';
import Link from 'next/link';
import { getBookById } from '@/src/lib/api';
import { Book } from '@/src/types';
import BookSummaryPanel from '@/src/components/BookSummaryPanel';
import BookInfoPanel from '@/src/components/BookInfoPanel';
import BookCategory from '@/src/components/BookCategory';
import 'react-quill-new/dist/quill.snow.css';
import './style.css';

interface BookPageParams {
  params: {
    id: string;
  };
}

export default async function BookPage(props: BookPageParams) {
  const { params } = props;
  const { id } = await params;

  const book = await fetchBook(id);

  if (!book) {
    return <div className="book-page-container">Book not found</div>;
  }

  return (
    <div className="book-page-container new-design">
      <div className="book-header">
        <Link href="/" className="book-page-btn">
          <span className="material-icons">back</span>
        </Link>
        <BookCategory book={book} />
      </div>
      <div className="book-main-content new-main-content">
        <BookInfoPanel book={book} />
        <BookSummaryPanel book={book} />
      </div>
    </div>
  );
}

async function fetchBook(id: string): Promise<Book | null> {
  try {
    const data = await getBookById(id);

    return data;
  } catch (err) {
    console.error('Failed to fetch book', err);
    return null;
  }
}
