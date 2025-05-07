import UserBooksPage from '@/src/components/UserBooksPage';
import { ReadCategory } from '@/src/types';

interface FinishedPageProps {
  params: {
    id: string;
  };
}

export default async function FinishedPage({ params }: FinishedPageProps) {
  const { id } = await params;

  return <UserBooksPage userId={id} category={ReadCategory.FINISHED} />;
}
