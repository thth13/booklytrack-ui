import { ReadCategory } from '@/src/lib/api';
import UserBooksPage from '@/src/components/UserBooksPage';

interface WantsToReadPageProps {
  params: {
    id: string;
  };
}

export default function WantsToReadPage({ params }: WantsToReadPageProps) {
  return (
    <UserBooksPage
      userId={params.id}
      category={ReadCategory.WANTS_READ}
      title="Want to Read"
      emptyMessage='No books in "Want to Read" list'
    />
  );
}