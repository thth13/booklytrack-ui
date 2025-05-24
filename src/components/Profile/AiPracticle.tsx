'use client';

import { useEffect, useState } from 'react';
import AiPracticleDialog from './AiPracticleDialog';
import { useUserProfile } from '@/src/context/UserProfileContext';

interface QuiPageProps {
  userId: string;
}

const AiPracticle = ({ userId }: QuiPageProps) => {
  const { recentNotes } = useUserProfile();
  const [active, setActive] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (recentNotes && recentNotes.length >= 5) {
      setDisabled(false);
    }
  }, [recentNotes]);

  return !active ? (
    recentNotes && (
      <section id="ai-practice-sidebar" className="bg-blue-600 rounded-lg p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-medium text-white">AI Practice Session</h2>
          <p className="text-white/90">
            Ready to test your knowledge? Start a short quiz with 5 questions based on your latest notes.
          </p>
          {disabled && <p className="text-white/90">You need at least 5 notes for any book to start a session</p>}
          <div className="space-y-3">
            <button
              onClick={() => setActive(true)}
              disabled={disabled}
              className={`w-full px-4 py-2.5 rounded-lg font-medium ${
                disabled
                  ? 'bg-gray-500 text-white opacity-50 cursor-not-allowed'
                  : 'bg-white text-blue-600 hover:bg-gray-100'
              }`}
            >
              Start Session
            </button>
            {/* <button className="w-full bg-blue-500 px-4 py-2.5 rounded-lg hover:bg-blue-700 text-white font-medium">
            View Past Sessions
          </button> */}
          </div>
          {/* <div className="mt-4 p-4 bg-blue-500 rounded-lg">
          <div className="text-white">
            <div className="text-sm font-medium">Latest Score</div>
            <div className="text-2xl font-bold">85%</div>
            <div className="text-sm opacity-90">From Atomic Habits</div>
          </div>
        </div> */}
        </div>
      </section>
    )
  ) : (
    <AiPracticleDialog userId={userId} endSession={() => setActive(false)} isStartQuiz={active} />
  );
};

export default AiPracticle;
