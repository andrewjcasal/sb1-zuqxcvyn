import React, { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { storeFeedback } from '@/services/storage';

interface FeedbackFormProps {
  businessId: string;
  callId: string;
  onSubmit: () => void;
}

export function FeedbackForm({ businessId, callId, onSubmit }: FeedbackFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await storeFeedback({
        businessId,
        callId,
        rating,
        comment,
        timestamp: new Date().toISOString()
      });
      onSubmit();
    } catch (error) {
      console.error('Failed to store feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-cyan-300 mb-2">
          How was your experience?
        </h3>
        <p className="text-gray-300">
          Your feedback helps us improve our AI voice agent
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className="focus:outline-none"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  value <= rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-400'
                }`}
              />
            </button>
          ))}
        </div>

        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <textarea
            placeholder="Share your thoughts about the call experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full min-h-[100px] pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || rating === 0}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
      </Button>
    </form>
  );
}