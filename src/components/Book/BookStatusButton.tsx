import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faCheck, faCheckDouble, faListCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Fragment, useContext, useEffect } from 'react';
import { Menu, MenuButton, MenuItem, Transition } from '@headlessui/react';
import { Book, ReadCategory } from '@/src/types';
import { getUserBookCategory } from '@/src/lib/utils';
import { useUserProfile } from '@/src/context/UserProfileContext';
import { useBook } from '@/src/context/BookContext';
import { AuthContext } from '@/src/context/AuthContext';

const BookStatusButton = ({ book }: { book: Book }) => {
  const authContext = useContext(AuthContext);
  const userId = authContext?.userId;
  const { profile, addBookToProfile } = useUserProfile();

  const { currentCategory, setCurrentCategory } = useBook();

  const handleAddBook = async () => {
    if (userId) {
      addBookToProfile(book._id, userId, ReadCategory.READING);
    }
  };

  const handleCategoryChange = async (newCategory: ReadCategory) => {
    if (userId && currentCategory) {
      addBookToProfile(book._id, userId, newCategory, currentCategory);
    }
  };

  useEffect(() => {
    if (!book || !profile) return;
    setCurrentCategory(getUserBookCategory(profile, book._id));
  }, [book, profile, setCurrentCategory]);

  const classNames = (...classes: (string | undefined | null | false)[]): string => {
    return classes.filter(Boolean).join(' ');
  };

  const menuItems = [
    {
      category: ReadCategory.READING,
      icon: faBookOpen,
      label: 'Currently Reading',
    },
    {
      category: ReadCategory.WANTS_READ,
      icon: faListCheck,
      label: 'Want to Read',
    },
    {
      category: ReadCategory.FINISHED,
      icon: faCheckDouble,
      label: 'Finished Reading',
    },
    {
      category: ReadCategory.DELETE,
      icon: faTrash,
      label: 'Delete from library',
    },
  ];

  const filteredMenuItems = menuItems.filter((item) => item.category !== currentCategory);

  return (
    <div className="mt-6 space-y-3">
      {currentCategory ? (
        <Menu as="div" className="relative">
          <MenuButton className="w-full px-4 py-2.5 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-between">
            <span className="flex items-center">
              <FontAwesomeIcon
                icon={menuItems.find((item) => item.category === currentCategory)?.icon || faBookOpen}
                className="mr-2"
              />
              {menuItems.find((item) => item.category === currentCategory)?.label || 'Выбрать статус'}
            </span>
            <FontAwesomeIcon icon={faCheck} />
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {filteredMenuItems.map((item) => (
                <MenuItem key={item.category}>
                  {({ active }: { active: boolean }) => (
                    <button
                      className={classNames(
                        'w-full px-4 py-2.5 text-left flex items-center',
                        active ? 'bg-gray-50 text-gray-900' : 'text-gray-700',
                      )}
                      onClick={() => handleCategoryChange(item.category)}
                    >
                      <FontAwesomeIcon icon={item.icon} className="mr-2" />
                      {item.label}
                    </button>
                  )}
                </MenuItem>
              ))}
            </div>
          </Transition>
        </Menu>
      ) : (
        <button
          onClick={handleAddBook}
          className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
        >
          <i className="fa-solid fa-bookmark mr-2"></i>
          Mark as Reading
        </button>
      )}

      {/* <button className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center">
      <i className="fa-solid fa-share-nodes mr-2"></i>
      Share
    </button> */}
    </div>
  );
};

export default BookStatusButton;
