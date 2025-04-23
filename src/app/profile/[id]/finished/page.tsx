import UserBooksPage from '@/src/components/UserBooksPage';
import { ReadCategory } from '@/src/types';

interface FinishedPageProps {
  params: {
    id: string;
  };
}

export default function FinishedPage({ params }: FinishedPageProps) {
  return (
    <UserBooksPage
      userId={params.id}
      category={ReadCategory.FINISHED}
      title="Finished"
      emptyMessage="No finished books"
    />
  );
}
