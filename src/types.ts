export interface Book {
  id: string;
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: Date;
  description: string;
  smallThumbnail?: string;
  volumeInfo: any;
}

export interface UserProfile {
  _id: string;
  name: string;
  avatar: string;
  description: string;
  views: number;
  following: string[];
  followers: string[];
  reading: string[];
  finished: string[];
  wantsToRead: string[];
  user: string;
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
