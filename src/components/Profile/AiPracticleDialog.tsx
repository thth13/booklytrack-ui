'use client';

import { SOCKET_URL } from '@/src/constants';
import { useUserProfile } from '@/src/context/UserProfileContext';
import { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

interface QuestionData {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  previousAnswerFeedback?: string;
  previousAnswerScore?: number;
}

interface QuizResult {
  totalScore: number;
  maxPossibleScore: number;
}

interface QuiPageProps {
  userId: string;
  isStartQuiz: boolean;
  endSession: () => void;
}

export default function QuizPage({ userId, endSession, isStartQuiz }: QuiPageProps) {
  const { recentNotes } = useUserProfile();
  const [loading, setLoading] = useState<boolean>(false);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [waitResponse, setWaitResponse] = useState<boolean>(false);
  const socketRef = useRef<Socket | null>(null);

  const submitAnswer = () => {
    if (!userAnswer.trim()) {
      setError('Please enter your answer');
      return;
    }
    setWaitResponse(true);
    setCurrentQuestion(null);
    setLoading(true);

    if (socketRef.current) {
      socketRef.current.emit('submit_answer', {
        answer: userAnswer.trim(),
      });
      setError('');
    }
  };

  const nextQuestion = () => {
    setWaitResponse(false);
  };

  const handleEndSession = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      setIsConnected(false);
      setQuizResult(null);
      endSession();
    }
  };

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on('connect', () => {
      setIsConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
    });

    socketRef.current.on('question', (data: QuestionData) => {
      setCurrentQuestion(data);
      setUserAnswer('');
      setLoading(false);
    });

    socketRef.current.on('quiz_completed', (data: QuizResult) => {
      setQuizResult(data);
      setQuizStarted(false);
      setLoading(false);
    });

    socketRef.current.on('error', (err: { message: string }) => {
      setError(err.message);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (isStartQuiz) {
      startQuiz();
    }
  }, [isStartQuiz]);

  const startQuiz = () => {
    if (socketRef.current) {
      socketRef.current.emit('start_quiz', {
        userId: userId.trim(),
        notes: recentNotes.map((note) => note.content),
      });
      setQuizStarted(true);
      setError('');
      setQuizResult(null);
    }
  };

  return (
    <>
      <>
        {quizStarted && (
          <section id="active-ai-session" className="bg-blue-600 rounded-lg p-6 animate-fade-in">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium text-white">AI Session (beta)</h2>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm transition-all duration-300 animate-pulse">
                  In Progress
                </span>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-lg transition-all duration-300 animate-fade-in">
                <p className="text-gray-700 transition-all duration-300">
                  {waitResponse
                    ? 'Waiting for the AI answer...'
                    : currentQuestion
                    ? currentQuestion.question
                    : '  Waiting for the first question...'}
                </p>

                {waitResponse && currentQuestion && currentQuestion.previousAnswerFeedback && (
                  <div className="mb-4 mt-4 p-3 bg-gray-50 rounded animate-fade-in">
                    <p>{currentQuestion.previousAnswerFeedback}</p>
                    <p className="mt-1 mb-4">Score: {currentQuestion.previousAnswerScore}/10</p>
                    <button
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                      onClick={nextQuestion}
                    >
                      Next Question
                    </button>
                  </div>
                )}

                {currentQuestion && !waitResponse && (
                  <>
                    <textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-24 resize-none transition-all duration-300"
                      placeholder="Type your answer here..."
                    />

                    <div className="flex justify-between mt-4 gap-2">
                      <button
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                        onClick={submitAnswer}
                      >
                        {loading ? 'Submitting...' : 'Submit Answer'}
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between text-white/90 text-sm">
                <span>
                  Question {currentQuestion?.questionNumber ?? 1} of {currentQuestion?.totalQuestions ?? 5}
                </span>
                {/* <span>
                  Time:
                </span> */}
              </div>

              <button
                className="w-full bg-blue-500 px-4 py-2.5 rounded-lg hover:bg-blue-700 text-white font-medium transition-all duration-200"
                onClick={handleEndSession}
              >
                End Session
              </button>
            </div>
            {/* {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded animate-fade-in">{error}</div>} */}
          </section>
        )}
      </>

      {quizResult && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Quiz Completed!</h2>
          <p>
            Your score: {quizResult.totalScore} out of {quizResult.maxPossibleScore}
          </p>
          <button
            onClick={handleEndSession}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Start New Quiz
          </button>
        </div>
      )}

      {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      <div className="mt-4 text-sm text-gray-500">Connection status: {isConnected ? 'Connected' : 'Disconnected'}</div>
    </>
  );
}
