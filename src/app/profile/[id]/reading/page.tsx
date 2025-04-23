import UserBooksPage from '@/src/components/UserBooksPage';
import { ReadCategory } from '@/src/types';

interface ReadingPageProps {
  params: {
    id: string;
  };
}

export default function ReadingPage({ params }: ReadingPageProps) {
  return (
    <UserBooksPage
      userId={params.id}
      category={ReadCategory.READING}
      title="Currently Reading"
      emptyMessage="No books in progress"
    />
  );
}
