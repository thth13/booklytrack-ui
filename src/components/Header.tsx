'use client';
import Link from '@/src/components/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const Header = () => {
  const auth = useContext(AuthContext);

  return (
    <header className="bg-white fixed w-full top-0 z-50 shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              BooklyTrack
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {auth?.userId && (
              <button
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg flex items-center"
                onClick={auth?.logout}
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
