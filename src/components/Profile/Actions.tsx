import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faPenToSquare, faRobot } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Actions = () => (
  <section className="grid grid-cols-3 gap-6 mb-8 ">
    <Link
      href="/books"
      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center"
    >
      <span className="text-3xl mb-0 text-blue-600">
        <FontAwesomeIcon icon={faBookOpen} className="text-3xl mb-3 text-blue-600" />
      </span>
      <h3 className="text-lg font-medium text-gray-800">Add New Book</h3>
      <p className="text-gray-500 text-sm mt-1">Track your reading journey</p>
    </Link>
    <button className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow opacity-50 grayscale pointer-events-none">
      <FontAwesomeIcon icon={faPenToSquare} className="text-3xl mb-3 text-green-600" />
      <h3 className="text-lg font-medium text-gray-800">Write Notes</h3>
      <p className="text-gray-500 text-sm mt-1">Capture your thoughts</p>
    </button>
    <button className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow opacity-50 grayscale pointer-events-none">
      <FontAwesomeIcon icon={faRobot} className="text-3xl mb-3 text-purple-600" />
      <h3 className="text-lg font-medium text-gray-800">AI Practice</h3>
      <p className="text-gray-500 text-sm mt-1">Test your knowledge</p>
    </button>
  </section>
);

export default Actions;
