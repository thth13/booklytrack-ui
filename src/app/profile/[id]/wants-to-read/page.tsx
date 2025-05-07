import UserBooksPage from '@/src/components/UserBooksPage';
import { ReadCategory } from '@/src/types';

interface WantsToReadPageProps {
  params: {
    id: string;
  };
}

export default async function WantsToReadPage({ params }: WantsToReadPageProps) {
  const { id } = await params;

  return <UserBooksPage userId={id} category={ReadCategory.WANTS_READ} />;
}
