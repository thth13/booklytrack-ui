import { notFound } from 'next/navigation';
import './style.css';
import { cookies } from 'next/headers';
import { UserProfile } from '@/src/types';
import { getProfile } from '@/src/lib/api';
import Header from '@/src/components/Header';
import ProfileCard from '@/src/components/Profile/ProfileCard';
import Actions from '@/src/components/Profile/Actions';
import CurrentlyReading from '@/src/components/Profile/CurrentlyReading';
import Footer from '@/src/components/Footer';
import AiPracticle from '@/src/components/Profile/AiPracticle';
import RecentNotes from '@/src/components/Profile/RecentNotes';

interface ProfilePageParams {
  params: {
    id: string;
  };
}

export default async function Profile(props: ProfilePageParams) {
  const { params } = props;
  const { id } = await params;

  // Get userId from cookies on the server
  const cookieStore = await cookies();
  const myUserId = cookieStore.get('userId')?.value;

  const isMyProfile = myUserId === id;

  const user = await fetchUserProfile(id);

  if (!user) {
    notFound();
  }

  return (
    <>
      <Header avatar={user.avatar} />
      <main className="pt-20 min-h-[800px] bg-gray-50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex gap-8">
            <div className="w-80 space-y-6">
              <ProfileCard isMyProfile={isMyProfile} user={user} />
              {/* <AiPracticle /> */}
            </div>
            <div className="flex-1">
              <Actions />
              <CurrentlyReading userId={user.user} />
              <RecentNotes userId={user.user} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

async function fetchUserProfile(id: string): Promise<UserProfile | null> {
  try {
    const data = await getProfile(id);

    return data;
  } catch (err) {
    console.error('Failed to fetch user profile:', err);
    return null;
  }
}
