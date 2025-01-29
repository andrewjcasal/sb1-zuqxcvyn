import React from 'react';
import { Search, Wand2 } from 'lucide-react';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export function UrlInput({ onSubmit, isLoading }: UrlInputProps) {
  const [url, setUrl] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) onSubmit(url);
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-4 text-gray-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="url"
            placeholder="Enter any business website URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full h-14 pl-12 pr-36 rounded-2xl bg-white/5 border border-purple-500/20 focus:border-purple-500/50 text-white placeholder:text-gray-500 transition-colors"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-2 h-10 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl flex items-center transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Processing
              </div>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Analyze
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}