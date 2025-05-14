'use client';

import { useUserProfile } from '@/src/context/UserProfileContext';
import { Book, BookNotes } from '@/src/types';
import { getBookSummary, removeSummaryItem, updateSummaryItem } from '../../../lib/api';
import { useEffect, useState } from 'react';

import NoteForm from './NoteForm';
import NoteItem from './NoteItem';

const BookNotesSection = ({ book }: { book: Book }) => {
  const [notes, setNotes] = useState<BookNotes[]>([]);
  const [showAddNoteForm, setShowAddNoteForm] = useState(false);

  const { profile } = useUserProfile();

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
        {!showAddNoteForm && (
          <button
            onClick={() => setShowAddNoteForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <i className="fa-solid fa-plus mr-2"></i>
            Add Note
          </button>
        )}
      </div>

      <div className="space-y-6">
        {showAddNoteForm && (
          <div id="new-note-form" className="border border-gray-300 rounded-lg p-6 bg-gray-50">
            <NoteForm
              profile={profile}
              hideForm={() => setShowAddNoteForm(false)}
              bookId={book._id}
              setNotes={setNotes}
            />
          </div>
        )}

        {notes.map((item, index) => (
          <NoteItem
            key={index}
            item={item}
            deleteSummary={() => handleDeleteSummary(index)}
            onEdit={(newValue) => handleEditSummary(index, newValue)}
          />
        ))}
      </div>
    </section>
  );
};

export default BookNotesSection;
