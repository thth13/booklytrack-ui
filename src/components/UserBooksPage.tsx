import { getReadBooks } from '@/src/lib/api';
import Link from 'next/link';
import BooksList from '@/src/components/BooksList';
import './style.css';
import { Book, ReadCategory } from '../types';

interface UserBooksPageProps {
  userId: string;
  category: ReadCategory;
  title: string;
  emptyMessage: string;
}

export default async function UserBooksPage({ userId, category, title, emptyMessage }: UserBooksPageProps) {
  const books = await fetchBooks(userId, category);

  return (
    <div className="reading-page-container">
      <Link href="/" className="back-btn">
        ← Назад
      </Link>
      <h1 className="reading-title">{title}</h1>
      {!books || books.length === 0 ? <div className="empty-message">{emptyMessage}</div> : <BooksList books={books} />}
    </div>
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
