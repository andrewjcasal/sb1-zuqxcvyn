import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { ResultCard } from './result-card';

interface AnalysisResultsProps {
  data: {
    services: string[];
    location: string;
    hours: string;
    areaServed: string;
  } | null;
  isVoiceActive: boolean;
  onToggleVoice: () => void;
}

export function AnalysisResults({ data, isVoiceActive, onToggleVoice }: AnalysisResultsProps) {
  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-3xl blur-xl" />
        <div className="relative backdrop-blur-xl bg-black/20 border border-purple-500/20 rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-white">Analysis Results</h2>
            <button
              onClick={onToggleVoice}
              className="p-2 rounded-xl border border-purple-500/20 hover:bg-purple-500/10 transition-colors"
            >
              {isVoiceActive ? (
                <Mic className="w-5 h-5 text-purple-400" />
              ) : (
                <MicOff className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <ResultCard
              title="Services"
              content={
                <ul className="space-y-2">
                  {data.services.map((service, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              }
            />
            <ResultCard title="Location" content={data.location} />
            <ResultCard title="Business Hours" content={data.hours} />
            <ResultCard title="Service Area" content={data.areaServed} />
          </div>
        </div>
      </div>
    </div>
  );
}