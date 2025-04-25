import axios from 'axios';
import { api, GOOGLE_BOOKS_API } from '../authAxios';
import { API_URL } from '../authAxios';
import { BookEntryActionType, ReadCategory } from '../../types';

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

export async function getBookSummary(userId: string, bookId: string) {
  try {
    const res = await axios.get(`${API_URL}/book-summary/${userId}/${bookId}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function addBookSummmary(userId: string, bookId: string, summary: string) {
  try {
    const res = await api.post(`${API_URL}/book-summary/`, {
      content: summary,
      userId,
      bookId,
      actionType: BookEntryActionType.SUMMARY,
    });

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
