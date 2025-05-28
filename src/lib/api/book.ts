import axios from 'axios';
import { Book, ReadCategory } from '../../types';
import { API_URL, GOOGLE_BOOKS_API } from '@/src/constants';
import api from '../clientAxios';

export async function addBookToUserLibrary(
  bookId: string,
  userId: string,
  readCategory: ReadCategory,
  oldCategory?: ReadCategory,
) {
  try {
    const res = await api.post(`${API_URL}/profile/add-read-book`, {
      readCategory,
      userId,
      bookId,
      oldCategory,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getBookById(id: string): Promise<Book> {
  try {
    const res = await api.get(`${API_URL}/book/${id}`);

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function searchBooks(query: string) {
  const res = await axios.get(
    `${GOOGLE_BOOKS_API}?q=${encodeURIComponent(query)}&key=AIzaSyC9nLTd3paExG1qsub80hlslKc3aydWJhw`,
  );

  return res.data.items || [];
}

export async function getLatestBooks(): Promise<Book[]> {
  try {
    const res = await api.get(`${API_URL}/book/latest`);

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getReadBooks(userId: string, readCategory: ReadCategory) {
  try {
    const res = await api.get(`${API_URL}/profile/get-read-books/${userId}/${readCategory}`);

    return res.data;
  } catch (error) {
    throw error;
  }
}
