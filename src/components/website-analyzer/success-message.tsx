import React, { useState } from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { formatPhoneE164 } from '@/utils/phone';

interface SuccessMessageProps {
  onSubmitPhone: (phone: string) => void;
}

export function SuccessMessage({ onSubmitPhone }: SuccessMessageProps) {
  const [phone, setPhone] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsValid(true);

    try {
      if (!phone.trim()) {
        throw new Error('Please enter a phone number');
      }
      
      const formattedPhone = formatPhoneE164(phone);
      onSubmitPhone(formattedPhone);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid phone number');
      setIsValid(false);
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-cyan-300">
          Demo Mode Active
        </h3>
        <p className="text-gray-300">
          Enter a phone number to simulate a demo call. For testing, use a valid US phone number.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <Input
              type="tel"
              placeholder="(555) 555-5555"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setIsValid(true);
                setError(null);
              }}
              className={`pl-10 ${!isValid ? 'border-red-500' : 'border-white/20'}`}
            />
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
        >
          Start Demo Call
        </Button>
      </form>
    </div>
  );
}