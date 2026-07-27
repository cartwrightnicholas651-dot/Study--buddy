'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Search</h1>
          <p className="text-slate-600 dark:text-slate-400">Find your notes, quizzes, and flashcards</p>
        </div>

        <div className="flex gap-3 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search..."
              className="input-field pl-10"
            />
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <Filter size={20} />
            Filter
          </button>
        </div>

        {results.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-slate-600 dark:text-slate-400">No results found. Try searching for something else.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((result: any) => (
              <div key={result.id} className="card p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{result.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">{result.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
