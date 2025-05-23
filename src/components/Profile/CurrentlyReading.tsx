'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faBookOpen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { getReadBooks, addBookSummmary } from '@/src/lib/api';
import { Book, ReadCategory } from '@/src/types';
import Link from 'next/link';
import Image from 'next/image';

interface CurrentlyReadingProps {
  userId: string;
}

const CurrentlyReading = ({ userId }: CurrentlyReadingProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [current, setCurrent] = useState(0);
  const [note, setNote] = useState('');

  const handleAddNote = async () => {
    if (!note.trim()) return;

    await addBookSummmary(userId, books[current]._id, note);
    setNote('');
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const result = await getReadBooks(userId, ReadCategory.READING);
        setBooks(result || []);
        setCurrent(0);
      } catch (e) {
        setBooks([]);
        console.error('Error fetching books:', e);
      }
    };
    if (userId) {
      fetchBooks();
    }
  }, [userId]);

  const prevBook = () => setCurrent((prev) => (prev === 0 ? books.length - 1 : prev - 1));
  const nextBook = () => setCurrent((prev) => (prev === books.length - 1 ? 0 : prev + 1));

  if (!books.length) {
    return (
      <section id="current-book" className="bg-white rounded-xl p-8 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-medium text-gray-800">Currently Reading</h3>
        </div>
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-gray-100">
            <FontAwesomeIcon icon={faBookOpen} className="text-4xl text-gray-400" />
          </div>
          <h4 className="text-xl font-medium text-gray-800 mb-3">No Books in Progress</h4>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Start your reading journey by adding a book to your currently reading list.
          </p>
          <Link
            href="/books"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add a Book
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="current-book" className="bg-white rounded-xl p-8 shadow-sm mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-medium text-gray-800">Currently Reading</h3>
        {books.length > 1 && (
          <div className="flex gap-3">
            <button
              id="prev-book"
              className="p-3 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
              onClick={prevBook}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              id="next-book"
              className="p-3 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
              onClick={nextBook}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}
      </div>
      <div id="books-carousel" className="relative">
        <div className="flex items-start gap-8">
          <Link href={`/books/${books[current].googleId}`} className="w-48">
            {books[current].imageLinks.small && (
              <Image
                width={180}
                height={270}
                className="w-full object-cover rounded-lg shadow-lg"
                src={books[current].imageLinks.small}
                alt="book cover"
                loading="lazy"
              />
            )}
          </Link>
          <div className="flex-1">
            <Link href={`/books/${books[current].googleId}`}>
              <h4 className="text-xl font-medium text-gray-800 mb-2">{books[current].title}</h4>
              <p className="text-gray-600 mb-4">by {books[current].authors?.join(', ') || '—'}</p>
            </Link>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your thoughts about the book..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-32 resize-none bg-gray-50"
            ></textarea>
            <button
              className="mt-3 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
              onClick={handleAddNote}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add Note
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentlyReading;
