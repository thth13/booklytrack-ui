import Image from 'next/image';
import { Book } from '@/src/types';
import noBookImage from '@/public/noBookimage.webp';
import BookStatusButton from './BookStatusButton';

const BookSection = ({ book }: { book: Book }) => {
  return (
    <section id="book-details" className="bg-white rounded-xl p-4 sm:p-8 shadow-sm mb-8">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="w-full md:w-1/3 max-w-[300px] mx-auto md:mx-0 mb-4 md:mb-0 flex flex-col items-center">
          <Image
            className="w-full object-cover h-auto rounded-lg shadow-lg md:max-h-none"
            src={book.imageLinks && book.imageLinks.medium ? book.imageLinks.medium : noBookImage}
            alt={book.title}
            width={500}
            height={700}
            sizes="80vw"
            loading="lazy"
          />
          <div className="w-full mt-4">
            <BookStatusButton book={book} />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{book.title}</h1>
              <p className="text-lg sm:text-xl text-gray-600 mt-2">by {book.authors?.join(', ') || '—'}</p>
            </div>
            {/* Book rating */}
            {/* <div className="flex items-center space-x-2">
              <span className="text-yellow-500 text-2xl">4.8</span>
              <div className="flex text-yellow-400">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStarHalfAlt} />
              </div>
            </div> */}
          </div>
          <div className="mt-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">About the Book</h2>
            {book.description && (
              <div
                className="text-gray-600 leading-relaxed text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: book.description }}
              />
            )}
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <div className="text-gray-600 text-sm sm:text-base">Pages</div>
              <div className="text-lg sm:text-xl font-semibold text-gray-800">{book.pageCount}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <div className="text-gray-600 text-sm sm:text-base">Published</div>
              <div className="text-lg sm:text-xl font-semibold text-gray-800">
                {book.publishedDate
                  ? typeof book.publishedDate === 'string'
                    ? (book.publishedDate as string).match(/^\d{4}/)?.[0] || book.publishedDate
                    : new Date(book.publishedDate).getFullYear()
                  : '—'}
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <div className="text-gray-600 text-sm sm:text-base">Language</div>
              <div className="text-lg sm:text-xl font-semibold text-gray-800">{book.language}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookSection;
