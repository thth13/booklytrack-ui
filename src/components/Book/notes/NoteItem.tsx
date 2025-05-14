import { BookNotes } from '@/src/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '@/src/lib/utils';
import NoteForm from './NoteForm';
import { useState } from 'react';

interface NoteItemProps {
  item: BookNotes;
  deleteSummary: () => void;
  onEdit?: (newValue: string) => void;
}

const NoteItem = ({ item, deleteSummary, onEdit }: NoteItemProps) => {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      {showEditForm ? (
        <NoteForm noteContent={item.content} hideForm={() => setShowEditForm(false)} onEdit={onEdit} />
      ) : (
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: item.content }} />
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <i className="fa-regular fa-clock mr-2"></i>
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              <span>{formatDate(item.createdAt || new Date())}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => setShowEditForm(true)} className="p-2 text-gray-600 hover:text-blue-600">
              <FontAwesomeIcon icon={faPencil} />
            </button>
            <button onClick={deleteSummary} className="p-2 text-gray-600 hover:text-red-600">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteItem;
