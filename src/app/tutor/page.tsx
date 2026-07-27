'use client';

import { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { tutorChat } from '@/lib/openai';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Tutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI Tutor. I can help you with any subject. What would you like to learn today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await tutorChat(
        messages.map((m) => ({ role: m.role, content: m.content })).concat([{ role: 'user', content: input }])
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response || 'I could not generate a response. Please try again.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast.error('Failed to get response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <MessageCircle className="text-primary-600" size={32} />
            AI Tutor
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Ask me anything and get instant explanations</p>
        </div>

        <div className="card p-6 h-96 overflow-y-auto mb-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                  message.role === 'user' ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-slate-600 dark:bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-600 dark:bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-slate-600 dark:bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask your question..."
            className="input-field flex-1"
            disabled={loading}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="btn-primary px-6 flex items-center gap-2"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
