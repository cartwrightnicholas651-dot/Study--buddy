'use client';

import { useAuth } from '@/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BookOpen, ClipboardList, MessageSquare, Zap, TrendingUp, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const mockStudyData = [
  { day: 'Mon', hours: 2 },
  { day: 'Tue', hours: 3 },
  { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 4 },
  { day: 'Fri', hours: 2.5 },
  { day: 'Sat', hours: 5 },
  { day: 'Sun', hours: 3 },
];

const mockQuizData = [
  { week: 'Week 1', average: 75 },
  { week: 'Week 2', average: 78 },
  { week: 'Week 3', average: 82 },
  { week: 'Week 4', average: 85 },
];

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push('/auth/login');
    }
    setLoading(false);
  }, [isAuthenticated, router, loading]);

  if (loading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome back, {user?.displayName || 'Student'}! 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Let's continue your learning journey today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Study Streak</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">7</p>
              </div>
              <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg">
                <Zap className="text-red-600 dark:text-red-400" size={24} />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Study Time</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">21.5h</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                <Clock className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Quizzes Done</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">12</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <ClipboardList className="text-green-600 dark:text-green-400" size={24} />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Avg Score</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">82%</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                <TrendingUp className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => router.push('/notes')}
            className="card p-6 hover:shadow-lg transition-shadow text-left"
          >
            <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Summarize Notes</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Upload and summarize</p>
          </button>

          <button
            onClick={() => router.push('/quizzes')}
            className="card p-6 hover:shadow-lg transition-shadow text-left"
          >
            <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <ClipboardList className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Generate Quiz</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Create practice tests</p>
          </button>

          <button
            onClick={() => router.push('/tutor')}
            className="card p-6 hover:shadow-lg transition-shadow text-left"
          >
            <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Ask AI Tutor</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Get instant help</p>
          </button>

          <button
            onClick={() => router.push('/flashcards')}
            className="card p-6 hover:shadow-lg transition-shadow text-left"
          >
            <div className="bg-yellow-100 dark:bg-yellow-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Flashcards</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Review and learn</p>
          </button>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Study Time Chart */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Weekly Study Hours</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockStudyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="hours" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quiz Score Chart */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Quiz Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockQuizData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                <XAxis dataKey="week" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="average" stroke="#2563eb" strokeWidth={2} dot={{ fill: '#2563eb' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
