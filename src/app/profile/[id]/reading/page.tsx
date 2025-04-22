import { ReadCategory } from '@/src/lib/api';
import UserBooksPage from '@/src/components/UserBooksPage';

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
