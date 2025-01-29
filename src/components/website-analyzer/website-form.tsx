import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Globe, Phone } from 'lucide-react';
import { validateUrl } from '@/utils/validation';
import { normalizeUrl } from '@/utils/url';

interface WebsiteFormProps {
  onSubmit: (data: { url: string; phone: string }) => void;
  isLoading: boolean;
}

export function WebsiteForm({ onSubmit, isLoading }: WebsiteFormProps) {
  const [url, setUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ url?: string; phone?: string }>({});

  const validatePhone = (value: string) => {
    // Basic US phone number validation
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { url?: string; phone?: string } = {};

    // Validate URL
    if (!validateUrl(url)) {
      newErrors.url = 'Please enter a valid website URL';
    }

    // Validate phone
    if (!validatePhone(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Normalize the URL before submitting
      const normalizedUrl = normalizeUrl(url);
      onSubmit({ url: normalizedUrl, phone });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setErrors((prev) => ({ ...prev, url: undefined }));
            }}
            className={`pl-10 ${
              errors.url ? 'border-red-500' : 'border-white/20'
            } bg-white/10 text-white placeholder:text-gray-400`}
            disabled={isLoading}
          />
        </div>
        {errors.url && (
          <p className="text-sm text-red-400">{errors.url}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="tel"
            placeholder="(555) 555-5555"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setErrors((prev) => ({ ...prev, phone: undefined }));
            }}
            className={`pl-10 ${
              errors.phone ? 'border-red-500' : 'border-white/20'
            } bg-white/10 text-white placeholder:text-gray-400`}
            disabled={isLoading}
          />
        </div>
        {errors.phone && (
          <p className="text-sm text-red-400">{errors.phone}</p>
        )}
      </div>

      <Button 
        type="submit"
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            Analyzing...
          </div>
        ) : (
          'Analyze Website'
        )}
      </Button>
    </form>
  );
}