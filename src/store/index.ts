import { create } from 'zustand';
import { User, Note, Quiz, Flashcard, ChatSession } from '@/types';

interface AuthStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  error: null,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  logout: () => set({ user: null }),
}));

interface NotesStore {
  notes: Note[];
  loading: boolean;
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  removeNote: (id: string) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  setLoading: (loading: boolean) => void;
}

export const useNotesStore = create<NotesStore>((set) => ({
  notes: [],
  loading: false,
  setNotes: (notes) => set({ notes }),
  addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
  removeNote: (id) => set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
  updateNote: (id, updates) =>
    set((state) => ({
      notes: state.notes.map((n) => (n.id === id ? { ...n, ...updates } : n)),
    })),
  setLoading: (loading) => set({ loading }),
}));

interface QuizzesStore {
  quizzes: Quiz[];
  loading: boolean;
  setQuizzes: (quizzes: Quiz[]) => void;
  addQuiz: (quiz: Quiz) => void;
  removeQuiz: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useQuizzesStore = create<QuizzesStore>((set) => ({
  quizzes: [],
  loading: false,
  setQuizzes: (quizzes) => set({ quizzes }),
  addQuiz: (quiz) => set((state) => ({ quizzes: [quiz, ...state.quizzes] })),
  removeQuiz: (id) => set((state) => ({ quizzes: state.quizzes.filter((q) => q.id !== id) })),
  setLoading: (loading) => set({ loading }),
}));

interface FlashcardsStore {
  cards: Flashcard[];
  loading: boolean;
  setCards: (cards: Flashcard[]) => void;
  addCard: (card: Flashcard) => void;
  removeCard: (id: string) => void;
  updateCard: (id: string, updates: Partial<Flashcard>) => void;
  setLoading: (loading: boolean) => void;
}

export const useFlashcardsStore = create<FlashcardsStore>((set) => ({
  cards: [],
  loading: false,
  setCards: (cards) => set({ cards }),
  addCard: (card) => set((state) => ({ cards: [card, ...state.cards] })),
  removeCard: (id) => set((state) => ({ cards: state.cards.filter((c) => c.id !== id) })),
  updateCard: (id, updates) =>
    set((state) => ({
      cards: state.cards.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    })),
  setLoading: (loading) => set({ loading }),
}));

interface ChatStore {
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  loading: boolean;
  setSessions: (sessions: ChatSession[]) => void;
  setCurrentSession: (session: ChatSession | null) => void;
  addMessage: (sessionId: string, message: any) => void;
  setLoading: (loading: boolean) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  sessions: [],
  currentSession: null,
  loading: false,
  setSessions: (sessions) => set({ sessions }),
  setCurrentSession: (session) => set({ currentSession: session }),
  addMessage: (sessionId, message) =>
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.id === sessionId ? { ...s, messages: [...s.messages, message] } : s
      ),
    })),
  setLoading: (loading) => set({ loading }),
}));

interface ThemeStore {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));
