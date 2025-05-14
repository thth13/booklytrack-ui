import { ReadCategory } from '../types';

export function getUserBookCategory(profile: any, bookId: string) {
  const categories = [ReadCategory.READING, ReadCategory.FINISHED, ReadCategory.WANTS_READ];
  for (const category of categories) {
    if (profile?.[category] && profile[category].some((id: string) => id === bookId)) {
      return category;
    }
  }
  return null;
}

export function formatDate(dateString: string | Date) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-EN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
