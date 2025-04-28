import { BookEntryActionType } from '@/src/types';
import { api } from '../clientAxios';
import { API_URL } from '@/src/constants';

export async function getBookSummary(userId: string, bookId: string) {
  try {
    const res = await api.get(`${API_URL}/book-summary/${userId}/${bookId}`);

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

export async function removeSummaryItem(userId: string, bookId: string, summaryIndex: number) {
  try {
    const res = await api.delete(`${API_URL}/book-summary/${userId}/${bookId}/${summaryIndex}`);

    return res.data;
  } catch (error) {
    throw error;
  }
}
