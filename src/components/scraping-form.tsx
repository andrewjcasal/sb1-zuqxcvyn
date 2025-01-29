import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Wand2 } from 'lucide-react';

interface ScrapingFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export function ScrapingForm({ onSubmit, isLoading }: ScrapingFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      onSubmit(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
      <div className="relative">
        <Input
          type="url"
          placeholder="Enter business website URL (e.g., https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full pr-24"
          required
        />
        <Button
          type="submit"
          className="absolute right-1 top-1"
          disabled={isLoading}
        >
          {isLoading ? (
            "Processing..."
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Analyze
            </>
          )}
        </Button>
      </div>
    </form>
  );
}