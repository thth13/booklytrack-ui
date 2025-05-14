'use client';

import { BookNotes, UserProfile } from '@/src/types';
import { addBookSummmary } from '../../../lib/api';
import { useState } from 'react';

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

  const addNote = async (e: any) => {
    e.preventDefault();

    if (onEdit) {
      onEdit(noteField);
      hideForm();
    }

    if (profile?.user && bookId && noteField && setNotes) {
      await addBookSummmary(profile?.user, bookId, noteField);
      setNotes((prev) => [...prev, { content: noteField, createdAt: new Date() }]);
      setNoteField('');
      hideForm();
    }
  };

  return (
    <form onSubmit={addNote} className="space-y-4">
      {/* <ReactQuill
                className="w-full  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                placeholder="Write your note here..."
              /> */}
      <textarea
        value={noteField}
        onChange={(e) => setNoteField(e.target.value)}
        className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        placeholder="Write your note here..."
      />
      <div className="flex justify-end space-x-3">
        <button onClick={hideForm} className="px-4 py-2 text-gray-600 hover:text-gray-800">
          Cancel
        </button>
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Save Note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
