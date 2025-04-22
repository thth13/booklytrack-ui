import { ReadCategory } from '@/src/lib/api';
import UserBooksPage from '@/src/components/UserBooksPage';

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
