'use client';

import { useState } from 'react';
import { calculateNextReview } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Card {
  id: string;
  front: string;
  back: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
}

const mockCards: Card[] = [
  {
    id: '1',
    front: 'What is photosynthesis?',
    back: 'The process by which plants convert light energy into chemical energy stored in glucose.',
    interval: 1,
    easeFactor: 2.5,
    repetitions: 1,
  },
  {
    id: '2',
    front: "Newton's First Law",
    back: 'An object at rest stays at rest, and an object in motion stays in motion unless acted upon by a force.',
    interval: 3,
    easeFactor: 2.3,
    repetitions: 2,
  },
];

export default function Flashcards() {
  const [cards, setCards] = useState<Card[]>(mockCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 flex items-center justify-center">
        <div className="card p-12 text-center">
          <p className="text-slate-600 dark:text-slate-400 text-lg">No flashcards yet. Create some to get started!</p>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  const handleRate = (rating: number) => {
    const updated = { ...currentCard };
    const metrics = calculateNextReview(rating, {
      interval: updated.interval,
      easeFactor: updated.easeFactor,
      repetitions: updated.repetitions,
    });

    updated.interval = metrics.interval;
    updated.easeFactor = metrics.easeFactor;
    updated.repetitions = metrics.repetitions;

    const newCards = [...cards];
    newCards[currentIndex] = updated;
    setCards(newCards);

    setIsFlipped(false);

    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast.success('Session complete!');
      setCurrentIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Flashcards</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Card {currentIndex + 1} of {cards.length}
          </p>
        </div>

        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="card p-12 min-h-96 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-all"
        >
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-8">{isFlipped ? 'Answer' : 'Question'}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-8">
            {isFlipped ? currentCard.back : currentCard.front}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">Click to flip</p>
        </div>

        {isFlipped && (
          <div className="mt-8">
            <p className="text-center text-slate-600 dark:text-slate-400 mb-4">How well did you remember?</p>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => handleRate(1)}
                className="btn-secondary p-4 text-center hover:bg-red-100 dark:hover:bg-red-900"
              >
                <p className="font-bold text-red-600">Hard</p>
                <p className="text-sm">1</p>
              </button>
              <button
                onClick={() => handleRate(3)}
                className="btn-secondary p-4 text-center hover:bg-yellow-100 dark:hover:bg-yellow-900"
              >
                <p className="font-bold text-yellow-600">Good</p>
                <p className="text-sm">3</p>
              </button>
              <button
                onClick={() => handleRate(5)}
                className="btn-secondary p-4 text-center hover:bg-green-100 dark:hover:bg-green-900"
              >
                <p className="font-bold text-green-600">Easy</p>
                <p className="text-sm">5</p>
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="card p-4 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">Interval</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{currentCard.interval}d</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">Ease</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{currentCard.easeFactor.toFixed(1)}</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">Reps</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{currentCard.repetitions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
