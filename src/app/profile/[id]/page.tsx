import { notFound } from 'next/navigation';
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

type ProfilePageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = 'force-dynamic';
export default async function Profile({ params }: ProfilePageProps) {
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
      <Header noLink />
      <main className="pt-15 min-h-[800px] bg-gray-50">
        <div className="container mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="w-full lg:w-80 lg:space-y-6">
              <ProfileCard isMyProfile={isMyProfile} user={user} />
              {isMyProfile && (
                <div className="hidden lg:block">
                  <AiPracticle userId={user.user} />
                </div>
              )}
            </div>
            <div className="flex-1">
              {isMyProfile && (
                <>
                  <Actions />
                  <CurrentlyReading userId={user.user} />
                  <div className="block lg:hidden mt-6 mb-6 lg:mb-0">
                    <AiPracticle userId={user.user} />
                  </div>
                </>
              )}

              <RecentNotes />
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
