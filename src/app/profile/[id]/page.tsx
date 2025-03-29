import { getProfile, UserProfile } from '@/src/lib/api';
import { notFound } from 'next/navigation';

interface ProfilePageParams {
  params: {
    id: string;
  };
}

export default async function Profile({ params }: ProfilePageParams) {
  const { id } = params;

  const user = await fetchUserProfile(id);

  if (!user) {
    notFound();
  }

  return (
    <>
      <h1>{user.name}</h1>
    </>
  );
}

async function fetchUserProfile(id: string): Promise<UserProfile | null> {
  try {
    console.log(id);
    const data = await getProfile(id);

    return data;
  } catch (err) {
    console.error('Failed to fetch user profile:', err);
    return null;
  }
}
