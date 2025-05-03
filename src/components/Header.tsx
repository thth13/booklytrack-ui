import Link from 'next/link';
import noAvatar from '@/public/noAvatar.png';
import { AVATAR_URL } from '../constants';

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
            <i className="fa-solid fa-magnifying-glass text-gray-600"></i>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <i className="fa-solid fa-bell text-gray-600"></i>
          </button>
          <img
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
