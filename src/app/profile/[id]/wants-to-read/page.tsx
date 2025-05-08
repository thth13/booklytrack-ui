import UserBooksPage from '@/src/components/UserBooksPage';
import { ReadCategory } from '@/src/types';

type WantsToReadPageProps = {
  params: Promise<{ id: string }>;
};

export default async function WantsToReadPage({ params }: WantsToReadPageProps) {
  const { id } = await params;

  return <UserBooksPage userId={id} category={ReadCategory.WANTS_READ} />;
}
