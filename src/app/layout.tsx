'use client';

import { ReactNode, useEffect } from 'react';
import { useTheme } from '@/hooks';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { isDark, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary-600">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">📚</div>
              Study Buddy
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8">
              <Link href="/dashboard" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                Dashboard
              </Link>
              <Link href="/notes" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                Notes
              </Link>
              <Link href="/quizzes" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                Quizzes
              </Link>
              <Link href="/tutor" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                Tutor
              </Link>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                aria-label="Toggle theme"
              >
                {isDark ? '☀️' : '🌙'}
              </button>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link href="/dashboard" className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                Dashboard
              </Link>
              <Link href="/notes" className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                Notes
              </Link>
              <Link href="/quizzes" className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                Quizzes
              </Link>
              <Link href="/tutor" className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                Tutor
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-600 dark:text-slate-400">
            <p>&copy; 2024 Study Buddy AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
