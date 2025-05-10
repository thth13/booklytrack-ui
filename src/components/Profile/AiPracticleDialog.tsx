'use client';
import { API_URL } from '@/src/constants';
import { getBookRecentSummaries } from '@/src/lib/api';
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
}

export default function QuizPage({ userId }: QuiPageProps) {
  const [notes, setNotes] = useState<string[]>([]);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(API_URL);

    socketRef.current.on('connect', () => {
      setIsConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
    });

    socketRef.current.on('question', (data: QuestionData) => {
      setCurrentQuestion(data);
      setUserAnswer('');
    });

    socketRef.current.on('quiz_completed', (data: QuizResult) => {
      setQuizResult(data);
      setQuizStarted(false);
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

  const startQuiz = () => {
    if (!notes) {
      setError('You dont have notes to start the quiz');
      return;
    }

    if (socketRef.current) {
      socketRef.current.emit('start_quiz', {
        userId: userId.trim(),
        notes,
      });
      setQuizStarted(true);
      setError('');
      setQuizResult(null);
    }
  };

  const submitAnswer = () => {
    if (!userAnswer.trim()) {
      setError('Please enter your answer');
      return;
    }

    if (socketRef.current) {
      socketRef.current.emit('submit_answer', {
        answer: userAnswer.trim(),
      });
      setError('');
    }
  };

  useEffect(() => {
    if (!userId) return;

    const fetchRecentSummaries = async () => {
      try {
        const data = await getBookRecentSummaries(userId);

        if (data && Array.isArray(data)) {
          const notesContent = data.map((note) => note.content);

          setNotes(notesContent);
        } else {
          setNotes([]);
        }
      } catch (error) {
        console.error('Error fetching recent summaries:', error);
        setNotes([]);
      }
    };

    fetchRecentSummaries();
  }, [userId]);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Book Quiz</h1>

      {!quizStarted ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <button
            onClick={startQuiz}
            disabled={!isConnected}
            className={`px-4 py-2 rounded text-white ${
              isConnected ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isConnected ? 'Start Quiz' : 'Connecting...'}
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          {!currentQuestion && quizStarted && (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">Ожидание первого вопроса...</p>
              {/* Можно добавить спиннер или другую анимацию загрузки здесь */}
            </div>
          )}
          {currentQuestion && (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">
                  Question {currentQuestion.questionNumber} of {currentQuestion.totalQuestions}
                </p>
                <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>

                {currentQuestion.previousAnswerFeedback && (
                  <div className="mb-4 p-3 bg-gray-50 rounded">
                    <p className="font-medium">Previous feedback:</p>
                    <p>{currentQuestion.previousAnswerFeedback}</p>
                    <p className="mt-1">Score: {currentQuestion.previousAnswerScore}/10</p>
                  </div>
                )}

                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full p-2 border rounded h-24"
                  placeholder="Your answer..."
                />
              </div>

              <button onClick={submitAnswer} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Submit Answer
              </button>
            </>
          )}
        </div>
      )}

      {quizResult && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Quiz Completed!</h2>
          <p>
            Your score: {quizResult.totalScore} out of {quizResult.maxPossibleScore}
          </p>
          <button
            onClick={() => {
              setQuizStarted(false);
              setQuizResult(null);
            }}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Start New Quiz
          </button>
        </div>
      )}

      {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      <div className="mt-4 text-sm text-gray-500">Connection status: {isConnected ? 'Connected' : 'Disconnected'}</div>
    </div>
  );
}
