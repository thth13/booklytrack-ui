import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faPenToSquare, faRobot } from '@fortawesome/free-solid-svg-icons';
import Link from '@/src/components/Link';

const Actions = () => (
  <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
    <Link
      href="/books"
      className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center"
    >
      <span className="text-3xl mb-0 text-blue-600">
        <FontAwesomeIcon icon={faBookOpen} className="text-3xl mb-3 text-blue-600" />
      </span>
      <h3 className="text-base sm:text-lg font-medium text-gray-800 text-center">Add New Book</h3>
      <p className="text-gray-500 text-xs sm:text-sm mt-1 text-center">Track your reading journey</p>
    </Link>
    <button className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow opacity-50 grayscale pointer-events-none flex flex-col items-center justify-center">
      <FontAwesomeIcon icon={faPenToSquare} className="text-3xl mb-3 text-green-600" />
      <h3 className="text-base sm:text-lg font-medium text-gray-800 text-center">Write Notes</h3>
      <p className="text-gray-500 text-xs sm:text-sm mt-1 text-center">Capture your thoughts</p>
    </button>
    <button className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow opacity-50 grayscale pointer-events-none flex flex-col items-center justify-center">
      <FontAwesomeIcon icon={faRobot} className="text-3xl mb-3 text-purple-600" />
      <h3 className="text-base sm:text-lg font-medium text-gray-800 text-center">AI Practice</h3>
      <p className="text-gray-500 text-xs sm:text-sm mt-1 text-center">Test your knowledge</p>
    </button>
  </section>
);

export default Actions;
