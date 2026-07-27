'use client';

import { useState } from 'react';
import { Upload, FileText, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { generateNoteSummary } from '@/lib/openai';

interface Summary {
  shortSummary: string;
  keyPoints: string[];
  formulas: string[];
  definitions: Record<string, string>;
  examTips: string[];
}

export default function NoteSummarizer() {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    
    // Simple text extraction (in production, use proper PDF/DOCX libraries)
    const text = await selectedFile.text();
    setContent(text);
  };

  const handleSummarize = async () => {
    if (!content.trim()) {
      toast.error('Please enter or upload content');
      return;
    }

    setLoading(true);
    try {
      const result = await generateNoteSummary(content);
      // Parse the AI response (in production, ensure proper JSON formatting)
      const parsed = JSON.parse(result);
      setSummary(parsed);
      toast.success('Summary generated successfully!');
    } catch (error) {
      toast.error('Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Note Summarizer</h1>
          <p className="text-slate-600 dark:text-slate-400">Upload or paste your notes to get AI-powered summaries</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Add Content</h2>
              
              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Upload File
                </label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                  <Upload className="mx-auto text-slate-400 mb-2" size={32} />
                  <input
                    type="file"
                    accept=".txt,.pdf,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-input"
                  />
                  <label htmlFor="file-input" className="cursor-pointer text-sm text-primary-600 font-medium">
                    {file ? file.name : 'Click to upload'}
                  </label>
                </div>
              </div>

              {/* Text Area */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Or Paste Text
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your notes here..."
                  className="input-field min-h-64 resize-none"
                />
              </div>

              {/* Summarize Button */}
              <button
                onClick={handleSummarize}
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Summarizing...
                  </>
                ) : (
                  'Generate Summary'
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {summary ? (
              <div className="space-y-6">
                {/* Short Summary */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Summary</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{summary.shortSummary}</p>
                </div>

                {/* Key Points */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Key Points</h3>
                  <ul className="space-y-2">
                    {summary.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex gap-3 text-slate-700 dark:text-slate-300">
                        <span className="text-primary-600 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Formulas */}
                {summary.formulas.length > 0 && (
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Formulas</h3>
                    <div className="space-y-2">
                      {summary.formulas.map((formula, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-mono text-sm text-slate-800 dark:text-slate-200"
                        >
                          {formula}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exam Tips */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Exam Tips</h3>
                  <ul className="space-y-2">
                    {summary.examTips.map((tip, idx) => (
                      <li key={idx} className="flex gap-3 text-slate-700 dark:text-slate-300">
                        <span className="text-yellow-600 font-bold">★</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="card p-12 flex flex-col items-center justify-center h-96">
                <FileText className="text-slate-400 mb-4" size={48} />
                <p className="text-slate-600 dark:text-slate-400 text-center">
                  Upload or paste your notes to generate a summary
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
