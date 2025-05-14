import React from 'react';
import { getBookById } from '@/src/lib/api';
import { Book } from '@/src/types';
import Header from '@/src/components/Header';
import BookSection from '@/src/components/Book/BookInfo';
import BookNotesSection from '@/src/components/Book/notes/Notes';
// import BookAiPracticle from '@/src/components/Book/BookAiPracticle';

type BookPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;

  const book = await fetchBook(id);

  if (!book) {
    return <div className="book-page-container">Book not found</div>;
  }

  return (
    <>
      <Header />
      <main className="pt-20 min-h-[800px] bg-gray-50">
        <div className="container mx-auto px-6 py-8">
          <BookSection book={book} />
          <BookNotesSection book={book} />
          {/* <BookAiPracticle /> */}
        </div>
      </main>
    </>
  );
}

async function fetchBook(id: string): Promise<Book> {
  try {
    const data = await getBookById(id);

    return data;
  } catch (err) {
    console.error('Failed to fetch book', err);
    throw err;
  }
}
