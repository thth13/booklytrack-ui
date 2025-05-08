import Link from 'next/link';
import noAvatar from '@/public/noAvatar.png';
import { AVATAR_URL } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

interface HeaderProps {
  avatar?: string;
}

const Header = ({ avatar }: HeaderProps) => (
  <header id="header" className="bg-white fixed w-full top-0 z-50 shadow-md">
    <div className="container mx-auto px-6 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            BookMind
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-600" />
          </button>
          {/* <button className="p-2 hover:bg-gray-100 rounded-full">
            <FontAwesomeIcon icon={faBell} className="text-gray-600" />
          </button> */}
          <Image
            width={100}
            height={100}
            src={avatar ? `${AVATAR_URL}/${avatar}` : noAvatar.src}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-gray-200"
          />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
