'use client';

import { useBook } from '@/src/context/BookContext';
import { useUserProfile } from '@/src/context/UserProfileContext';
import { Book, BookNotes } from '@/src/types';
import { addBookSummmary, getBookSummary, removeSummaryItem, updateSummaryItem } from '../../lib/api';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPencil, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '@/src/lib/utils';

const BookNotesSection = ({ book }: { book: Book }) => {
  const [notes, setNotes] = useState<BookNotes[]>([]);
  const [noteField, setNoteField] = useState<string>('');
  const { profile } = useUserProfile();
  const { currentCategory } = useBook();

  const addSummary = async (e: any) => {
    e.preventDefault();

    if (profile?.user) {
      await addBookSummmary(profile?.user, book._id, noteField);
      setNotes((prev) => [...prev, { content: noteField, createdAt: new Date() }]);
      setNoteField('');
    }
  };

  const handleDeleteSummary = async (indexToDelete: number) => {
    if (notes && profile?.user) {
      await removeSummaryItem(profile.user, book._id, indexToDelete);
      setNotes(notes.filter((_, idx) => idx !== indexToDelete));
    }
  };

  const handleEditSummary = async (indexToEdit: number, newValue: string) => {
    if (notes && profile?.user) {
      await updateSummaryItem(profile.user, book._id, indexToEdit, newValue);
      setNotes((prev) => prev.map((item, idx) => (idx === indexToEdit ? { ...item, content: newValue } : item)));
    }
  };

  useEffect(() => {
    if (!book || !profile) return;

    const fetchBookSummary = async () => {
      try {
        const data = await getBookSummary(profile.user, book._id);

        if (data) {
          setNotes(data.summary);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchBookSummary();
  }, [book, profile]);

  return (
    <section id="book-notes" className="bg-white rounded-xl p-8 shadow-sm mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Notes</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <i className="fa-solid fa-plus mr-2"></i>
          Add Note
        </button>
      </div>

      <div className="space-y-6">
        {notes.map((item, index) => (
          <div key={index} className="p-6 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-gray-600">{item.content}</p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <i className="fa-regular fa-clock mr-2"></i>
                  <FontAwesomeIcon icon={faClock} className="mr-2" />
                  <span>{formatDate(item.createdAt || new Date())}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-600 hover:text-blue-600">
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookNotesSection;
