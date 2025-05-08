import UserBooksPage from '@/src/components/UserBooksPage';
import { ReadCategory } from '@/src/types';

type ReadingPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ReadingPage({ params }: ReadingPageProps) {
  const { id } = await params;

  return <UserBooksPage userId={id} category={ReadCategory.READING} />;
}
