import axios from 'axios';
import { api, GOOGLE_BOOKS_API } from '../authAxios';
import { API_URL } from '../authAxios';
import { ReadCategory } from '../../types';

export async function addBookToUserLibrary(
  book: any,
  userId: string,
  readCategory: ReadCategory,
  oldCategory?: ReadCategory,
) {
  try {
    const res = await api.post(`${API_URL}/profile/add-read-book`, {
      readCategory,
      userId,
      book,
      oldCategory,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getBookById(id: string) {
  try {
    const res = await axios.get(`${GOOGLE_BOOKS_API}/${id}/?key=AIzaSyC9nLTd3paExG1qsub80hlslKc3aydWJhw`);

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

export async function getReadBooks(userId: string, readCategory: ReadCategory) {
  try {
    const res = await api.get(`${API_URL}/profile/get-read-books/${userId}/${readCategory}`);

    return res.data;
  } catch (error) {
    throw error;
  }
}
