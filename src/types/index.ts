// User Types
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  school?: string;
  gradeLevel?: string;
  createdAt: Date;
  updatedAt: Date;
  isPremium: boolean;
  studyStreak: number;
  totalStudyTime: number;
}

// Note Types
export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  fileUrl?: string;
  fileName?: string;
  fileType?: 'pdf' | 'docx' | 'txt';
  summary?: NoteSummary;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteSummary {
  shortSummary: string;
  keyPoints: string[];
  formulas?: string[];
  definitions?: Record<string, string>;
  examTips: string[];
}

// Quiz Types
export interface Quiz {
  id: string;
  userId: string;
  noteId?: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  userAnswers: (string | number)[];
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpent: number; // in seconds
  createdAt: Date;
}

// Flashcard Types
export interface Flashcard {
  id: string;
  userId: string;
  noteId?: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  nextReviewDate: Date;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlashcardProgress {
  id: string;
  userId: string;
  cardId: string;
  interval: number; // days
  easeFactor: number; // SM-2 algorithm
  repetitions: number;
  lastReviewDate: Date;
}

// Tutor Chat Types
export interface ChatMessage {
  id: string;
  userId: string;
  role: 'user' | 'assistant';
  content: string;
  topic?: string;
  createdAt: Date;
}

export interface ChatSession {
  id: string;
  userId: string;
  topic: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// Study Plan Types
export interface StudySession {
  id: string;
  userId: string;
  title: string;
  subject: string;
  duration: number; // in minutes
  scheduledDate: Date;
  completedDate?: Date;
  status: 'pending' | 'in-progress' | 'completed';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudyPlan {
  id: string;
  userId: string;
  name: string;
  description: string;
  subjects: string[];
  sessions: StudySession[];
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Progress Types
export interface ProgressStats {
  userId: string;
  totalTimeStudied: number; // in minutes
  quizzesCompleted: number;
  averageQuizScore: number;
  topicsMastered: string[];
  flashcardsReviewed: number;
  currentStreak: number;
  lastStudyDate: Date;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'reminder' | 'progress' | 'achievement' | 'system';
  read: boolean;
  createdAt: Date;
}

// Subscription Types
export enum SubscriptionTier {
  FREE = 'free',
  PRO = 'pro',
  PREMIUM = 'premium',
}

export interface Subscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  startDate: Date;
  endDate?: Date;
  autoRenew: boolean;
  paymentMethod?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
