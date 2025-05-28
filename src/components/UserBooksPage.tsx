import { getReadBooks } from '@/src/lib/api';
import Link from '@/src/components/Link';
import BooksList from '@/src/components/BooksList';
import { Book, ReadCategory } from '../types';
import Footer from './Footer';
import Header from './Header';

interface UserBooksPageProps {
  userId: string;
  category: ReadCategory;
}

export default async function UserBooksPage({ userId, category }: UserBooksPageProps) {
  const books = await fetchBooks(userId, category);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-15 min-h-[800px] bg-gray-50">
        <div className="container mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-8">
          <section id="books-filter" className="mb-6 sm:mb-8">
            <div className="flex justify-center sm:justify-start">
              <div className="inline-flex flex-row bg-white rounded-xl shadow-sm p-1 overflow-x-auto">
                <Link href={`/profile/${userId}/reading`} passHref legacyBehavior>
                  <button
                    className={`px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base whitespace-nowrap ${
                      category === ReadCategory.READING ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Reading
                  </button>
                </Link>
                <Link href={`/profile/${userId}/finished`} passHref legacyBehavior>
                  <button
                    className={`px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base whitespace-nowrap ${
                      category === ReadCategory.FINISHED ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Finished
                  </button>
                </Link>
                <Link href={`/profile/${userId}/wants-to-read`} passHref legacyBehavior>
                  <button
                    className={`px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base whitespace-nowrap ${
                      category === ReadCategory.WANTS_READ ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Wishlist
                  </button>
                </Link>
              </div>
            </div>
          </section>
          <section className="space-y-4">
            {books && books.length > 0 ? (
              books.map((book) => <BooksList key={book.googleId} book={book} />)
            ) : (
              <div className="text-gray-500 text-center text-sm sm:text-base">No books have been added yet.</div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

async function fetchBooks(id: string, category: ReadCategory): Promise<Book[] | null> {
  try {
    const data = await getReadBooks(id, category);
    return data;
  } catch (err) {
    console.error('Error book loading:', err);

    return null;
  }
}
