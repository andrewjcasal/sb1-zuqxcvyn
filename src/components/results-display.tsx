import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from './ui/button';

interface ResultsDisplayProps {
  data: {
    services: string[];
    location: string;
    hours: string;
    areaServed: string;
  } | null;
  isVoiceActive: boolean;
  onToggleVoice: () => void;
}

export function ResultsDisplay({ 
  data, 
  isVoiceActive, 
  onToggleVoice 
}: ResultsDisplayProps) {
  if (!data) return null;

  return (
    <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg rounded-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Analysis Results</h2>
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleVoice}
          className="hover:bg-white/20"
        >
          {isVoiceActive ? (
            <Mic className="h-5 w-5" />
          ) : (
            <MicOff className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-white/80">Services</h3>
          <ul className="list-disc list-inside text-white/70">
            {data.services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white/80">Location</h3>
          <p className="text-white/70">{data.location}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white/80">Business Hours</h3>
          <p className="text-white/70">{data.hours}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white/80">Service Area</h3>
          <p className="text-white/70">{data.areaServed}</p>
        </div>
      </div>
    </div>
  );
}