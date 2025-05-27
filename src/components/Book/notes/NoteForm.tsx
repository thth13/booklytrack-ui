'use client';

import { BookNotes, UserProfile } from '@/src/types';
import { addNote } from '../../../lib/api';
import { useState } from 'react';
import { useUserProfile } from '@/src/context/UserProfileContext';

interface NoteFormProps {
  profile?: UserProfile | null;
  hideForm: () => void;
  noteContent?: string;
  bookId?: string;
  setNotes?: React.Dispatch<React.SetStateAction<BookNotes[]>>;
  onEdit?: (newValue: string) => void;
}

const NoteForm = ({ profile, hideForm, bookId, setNotes, onEdit, noteContent }: NoteFormProps) => {
  const [noteField, setNoteField] = useState<string>(noteContent || '');
  const { recentNotes, setRecentNotes } = useUserProfile();

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (onEdit) {
      onEdit(noteField);
      hideForm();
    }

    if (profile?.user && bookId && noteField && setNotes) {
      const newNote = await addNote(profile.user, bookId, noteField);
      setNotes((prev) => [newNote, ...prev]);
      setRecentNotes([newNote, ...(recentNotes || [])]);

      setNoteField('');
      hideForm();
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* <ReactQuill
          className="w-full  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          placeholder="Write your note here..."
      /> */}
      <textarea
        value={noteField}
        onChange={(e) => setNoteField(e.target.value)}
        className="w-full h-28 sm:h-32 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
        placeholder="Write your note here..."
      />
      <div className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3">
        <button
          type="button"
          onClick={hideForm}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 w-full sm:w-auto"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto"
        >
          Save Note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
