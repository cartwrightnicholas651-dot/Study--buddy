'use client';

import { useState } from 'react';
import { Plus, Trash2, Play } from 'lucide-react';
import toast from 'react-hot-toast';

interface Quiz {
  id: string;
  title: string;
  questions: number;
  avgScore: number;
  createdAt: string;
}

const mockQuizzes: Quiz[] = [
  { id: '1', title: 'Biology Chapter 5', questions: 20, avgScore: 85, createdAt: '2024-01-15' },
  { id: '2', title: 'Algebra Basics', questions: 15, avgScore: 78, createdAt: '2024-01-14' },
  { id: '3', title: 'World History', questions: 25, avgScore: 82, createdAt: '2024-01-13' },
];

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(mockQuizzes);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [questionCount, setQuestionCount] = useState(10);

  const handleCreateQuiz = () => {
    if (!title.trim()) {
      toast.error('Please enter a quiz title');
      return;
    }

    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title,
      questions: questionCount,
      avgScore: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setQuizzes([newQuiz, ...quizzes]);
    setTitle('');
    setQuestionCount(10);
    setShowModal(false);
    toast.success('Quiz created successfully!');
  };

  const handleDelete = (id: string) => {
    setQuizzes(quizzes.filter((q) => q.id !== id));
    toast.success('Quiz deleted');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Quiz Generator</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Create and practice quizzes</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
            <Plus size={20} />
            New Quiz
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="card p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Create New Quiz</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Quiz Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Biology Chapter 5"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Questions</label>
                  <input
                    type="number"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                    min="5"
                    max="50"
                    className="input-field"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">
                    Cancel
                  </button>
                  <button onClick={handleCreateQuiz} className="btn-primary flex-1">
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="card p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{quiz.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{quiz.questions} questions</p>
              {quiz.avgScore > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Average Score</span>
                    <span className="font-bold text-primary-600">{quiz.avgScore}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${quiz.avgScore}%` }}></div>
                  </div>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <button className="flex-1 btn-primary flex items-center justify-center gap-2">
                  <Play size={16} />
                  Start
                </button>
                <button onClick={() => handleDelete(quiz.id)} className="btn-secondary p-2">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
