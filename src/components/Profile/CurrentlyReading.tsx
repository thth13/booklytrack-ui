'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faBookOpen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { addNote, getReadBooks } from '@/src/lib/api';
import { Book, ReadCategory } from '@/src/types';
import Link from 'next/link';
import Image from 'next/image';
import { useUserProfile } from '@/src/context/UserProfileContext';

interface CurrentlyReadingProps {
  userId: string;
}

const CurrentlyReading = ({ userId }: CurrentlyReadingProps) => {
  const { recentNotes, setRecentNotes } = useUserProfile();
  const [books, setBooks] = useState<Book[]>([]);
  const [current, setCurrent] = useState(0);
  const [note, setNote] = useState('');

  const handleAddNote = async () => {
    if (!note.trim()) return;

    const newNote = await addNote(userId, books[current]._id, note);
    if (setRecentNotes) {
      setRecentNotes([newNote, ...(recentNotes || [])]);
    }
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
      <section id="current-book" className="bg-white rounded-xl p-4 sm:p-8 shadow-sm mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
          <h3 className="text-xl sm:text-2xl font-medium text-gray-800 text-center sm:text-left">Currently Reading</h3>
        </div>
        <div className="text-center py-8 sm:py-12">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-gray-100">
            <FontAwesomeIcon icon={faBookOpen} className="text-3xl sm:text-4xl text-gray-400" />
          </div>
          <h4 className="text-lg sm:text-xl font-medium text-gray-800 mb-3">No Books in Progress</h4>
          <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm sm:text-base">
            Start your reading journey by adding a book to your currently reading list.
          </p>
          <Link
            href="/books"
            className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center text-sm sm:text-base"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add a Book
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="current-book" className="bg-white rounded-xl p-4 sm:p-8 shadow-sm mb-6 sm:mb-8">
      <div className="flex flex-row items-center justify-between mb-6 gap-2">
        <h3 className="text-xl sm:text-2xl font-medium text-gray-800 text-left">Currently Reading</h3>
        {books.length > 1 && (
          <div className="flex gap-2 sm:gap-3 mt-0">
            <button
              id="prev-book"
              className="p-2 sm:p-3 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
              onClick={prevBook}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              id="next-book"
              className="p-2 sm:p-3 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
              onClick={nextBook}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}
      </div>
      <div id="books-carousel" className="relative">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8">
          <Link href={`/books/${books[current].googleId}`} className="w-full sm:w-48 flex-shrink-0 mb-4 sm:mb-0">
            {books[current].imageLinks.small && (
              <Image
                key={books[current].imageLinks.small}
                width={180}
                height={270}
                className="w-full object-cover rounded-lg shadow-lg"
                src={books[current].imageLinks.small}
                alt="book cover"
                loading="lazy"
              />
            )}
          </Link>
          <div className="flex-1 w-full">
            <Link href={`/books/${books[current].googleId}`}>
              <h4 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">{books[current].title}</h4>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">by {books[current].authors?.join(', ') || '—'}</p>
            </Link>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your thoughts about the book..."
              className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-24 sm:h-32 resize-none bg-gray-50 text-sm sm:text-base"
            ></textarea>
            <button
              className="mt-3 px-4 py-2 sm:px-6 sm:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center text-sm sm:text-base w-full sm:w-auto"
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
