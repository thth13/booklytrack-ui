export interface Book {
  id: string;
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  smallThumbnail?: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  avatar: string;
  description: string;
  views: number;
  following: object[];
  followers: object[];
  reading: object[];
  finished: object[];
  wantsToRead: object[];
}

export enum ReadCategory {
  READING = 'reading',
  FINISHED = 'finished',
  WANTS_READ = 'wantsToRead',
}

export enum BookEntryActionType {
  SUMMARY = 'summary',
  QUOTES = 'quotes',
}
