'use client';

import { useState } from 'react';
import AiPracticleDialog from './AiPracticleDialog';

interface QuiPageProps {
  userId: string;
}

const AiPracticle = ({ userId }: QuiPageProps) => {
  const [active, setActive] = useState(false);

  return !active ? (
    <section id="ai-practice-sidebar" className="bg-blue-600 rounded-lg p-6">
      <div className="space-y-4">
        <h2 className="text-xl font-medium text-white">AI Practice Session</h2>
        <p className="text-white/90">
          Ready to test your knowledge? Start an AI-powered practice session based on your notes.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => setActive(true)}
            className="w-full bg-white px-4 py-2.5 rounded-lg hover:bg-gray-100 text-blue-600 font-medium"
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
  ) : (
    <AiPracticleDialog userId={userId} />
  );
  // ) : (
  //   <section id="active-ai-session" className="bg-blue-600 rounded-lg p-6">
  //     <div className="space-y-4">
  //       <div className="flex justify-between items-center">
  //         <h2 className="text-xl font-medium text-white">Active AI Session</h2>
  //         <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">In Progress</span>
  //       </div>

  //       <div className="bg-white rounded-lg p-4">
  //         <p className="text-gray-800 font-medium mb-3">Based on your notes from "Atomic Habits":</p>
  //         <p className="text-gray-700 mb-4">What are the four laws of behavior change according to James Clear?</p>

  //         <textarea
  //           className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-24 resize-none"
  //           placeholder="Type your answer here..."
  //         ></textarea>

  //         <div className="flex justify-between mt-4">
  //           <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Skip Question</button>
  //           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Submit Answer</button>
  //         </div>
  //       </div>

  //       <div className="flex items-center justify-between text-white/90 text-sm">
  //         <span>Question 3 of 10</span>
  //         <span>Time: 5:23</span>
  //       </div>

  //       <button className="w-full bg-blue-500 px-4 py-2.5 rounded-lg hover:bg-blue-700 text-white font-medium">
  //         End Session
  //       </button>
  //     </div>
  //   </section>
  // );
};

export default AiPracticle;
