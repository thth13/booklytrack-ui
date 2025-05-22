import { getRecentNotes } from '@/src/lib/api';
import { formatDate } from '@/src/lib/utils';
import { BookNotes } from '@/src/types';
import { faBookOpen, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CurrentlyReadingProps {
  userId: string;
}

const RecentNotes = async ({ userId }: CurrentlyReadingProps) => {
  const notes = await fetchRecentNotes(userId);

  if (!notes || notes.length === 0) {
    return (
      <section id="reading-notes" className="bg-white rounded-lg p-6 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-gray-800">Recent Notes</h2>
        </div>
        <div className="text-center py-10">
          <FontAwesomeIcon icon={faBookOpen} className="text-4xl text-gray-300 mb-4" />
          <p className="text-gray-500">У вас пока нет недавних заметок.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="reading-notes" className="bg-white rounded-lg p-6 shadow-sm mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-gray-800">Recent Notes</h2>
        <button className="text-blue-600 hover:text-blue-700">View All</button>
      </div>
      <div className="space-y-4">
        {notes.map((note, index) => (
          <div key={note._id || index} className="p-5 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="text-gray-600 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: note.content }} />
            <div className="flex items-center mt-3 text-sm text-gray-500">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              <span>{formatDate(note.createdAt || new Date())}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

async function fetchRecentNotes(userId: string): Promise<BookNotes[] | null> {
  try {
    const data = await getRecentNotes(userId);

    return data;
  } catch (err) {
    console.error('Failed to fetch user profile:', err);
    return null;
  }
}

export default RecentNotes;
