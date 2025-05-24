import { api } from '../clientAxios';
import { API_URL } from '@/src/constants';

export async function getBookNotes(userId: string, bookId: string) {
  try {
    const res = await api.get(`${API_URL}/book-notes/${userId}/${bookId}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getRecentNotes(userId: string) {
  console.log(`${API_URL}/book-notes/recent/${userId}`);
  try {
    const res = await api.get(`${API_URL}/book-notes/recent/${userId}`);

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function addNote(userId: string, bookId: string, content: string) {
  try {
    const res = await api.post(`${API_URL}/book-notes/`, {
      content,
      userId,
      bookId,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateNote(noteId: string, content: string) {
  try {
    const res = await api.put(`${API_URL}/book-notes/${noteId}`, {
      content,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteNote(noteId: string) {
  try {
    const res = await api.delete(`${API_URL}/book-notes/${noteId}`);

    return res.data;
  } catch (error) {
    throw error;
  }
}
