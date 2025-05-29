'use client';

import { useEffect, useState } from 'react';
import { useUserProfile } from '@/src/context/UserProfileContext';
import { Book, BookNotes } from '@/src/types';
import { getBookNotes, deleteNote, updateNote } from '../../../lib/api';
import NoteForm from './NoteForm';
import NoteItem from './NoteItem';

const BookNotesSection = ({ book }: { book: Book }) => {
  const [notes, setNotes] = useState<BookNotes[]>([]);
  const [showAddNoteForm, setShowAddNoteForm] = useState(false);

  const { profile, recentNotes, setRecentNotes } = useUserProfile();

  const handleDeleteNote = async (id: string) => {
    if (notes && profile?.user) {
      await deleteNote(id);

      setNotes(notes.filter((note) => note._id !== id));
      setRecentNotes(recentNotes.filter((note) => note._id !== id));
    }
  };

  const handleEditNote = async (id: string, newValue: string) => {
    if (notes && profile?.user) {
      await updateNote(id, newValue);

      setNotes((prev) => prev.map((item) => (item._id === id ? { ...item, content: newValue } : item)));
      setRecentNotes(recentNotes.map((item) => (item._id === id ? { ...item, content: newValue } : item)));
    }
  };

  useEffect(() => {
    if (!book || !profile) return;

    const fetchNotes = async () => {
      try {
        const data = await getBookNotes(profile.user, book._id);

        if (data) {
          setNotes(data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchNotes();
  }, [book, profile]);

  return (
    <section id="book-notes" className="bg-white rounded-xl p-8 shadow-sm mb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Notes</h2>
          <span className="text-sm text-gray-500">{notes.length} notes</span>
        </div>
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
            deleteNote={() => handleDeleteNote(item._id)}
            onEdit={(newValue) => handleEditNote(item._id, newValue)}
          />
        ))}
      </div>
    </section>
  );
};

export default BookNotesSection;
