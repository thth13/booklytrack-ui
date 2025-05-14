import { getReadBooks } from '@/src/lib/api';
import Link from 'next/link';
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
    <>
      <Header />
      <main className="pt-20 min-h-[800px] bg-gray-50">
        <div className="container mx-auto px-6 py-8">
          <section id="books-filter" className="mb-8">
            <div className="inline-flex bg-white rounded-xl shadow-sm p-1">
              <Link href={`/profile/${userId}/reading`} passHref legacyBehavior>
                <button
                  className={`px-6 py-2 rounded-lg ${
                    category === ReadCategory.READING ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Reading
                </button>
              </Link>
              <Link href={`/profile/${userId}/finished`} passHref legacyBehavior>
                <button
                  className={`px-6 py-2 rounded-lg ${
                    category === ReadCategory.FINISHED ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Finished
                </button>
              </Link>
              <Link href={`/profile/${userId}/wants-to-read`} passHref legacyBehavior>
                <button
                  className={`px-6 py-2 rounded-lg ${
                    category === ReadCategory.WANTS_READ ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Wishlist
                </button>
              </Link>
            </div>
          </section>
          <section className="space-y-4">
            {books && books.map((book) => <BooksList key={book.googleId} book={book} />)}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

async function fetchBooks(id: string, category: ReadCategory): Promise<Book[] | null> {
  try {
    const data = await getReadBooks(id, category);
    return data;
  } catch (err) {
    console.error('Ошибка получения книг:', err);
    return null;
  }
}
