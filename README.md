# Study Buddy AI - Modern Learning Platform

A production-ready AI-powered study application that helps students learn more effectively through intelligent summarization, quiz generation, AI tutoring, and spaced repetition flashcards.

## 🎯 Features

- ✅ **User Authentication** - Email/Password & Google Sign-in
- ✅ **Dashboard** - Study streaks, recent sessions, quick actions
- ✅ **AI Note Summarizer** - PDF, DOCX, TXT file support
- ✅ **AI Quiz Generator** - Multiple question types
- ✅ **AI Tutor** - ChatGPT-like interface
- ✅ **Flashcards** - Spaced repetition scheduling
- ✅ **Study Planner** - Schedule management
- ✅ **Progress Tracking** - Statistics & analytics

## 🚀 Quick Start

```bash
git clone <repo>
cd study-buddy-ai
npm install
cp .env.example .env.local
npm run dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/          # Next.js app router
├── components/   # Reusable components
├── lib/          # Utilities & services
├── hooks/        # Custom React hooks
├── store/        # Zustand state
├── types/        # TypeScript types
└── styles/       # Global styles
```

## 🔐 Security

- Firebase Auth (OAuth 2.0)
- Server-side API key protection
- Input validation & sanitization

## 📄 License

MIT License
