import React, { useState } from 'react';
import { X } from 'lucide-react';
import { WebsiteForm } from './website-form';
import { LoadingAnimation } from './loading-animation';
import { BusinessDetails } from './business-details';
import { ErrorDisplay } from './error-display';
import { analyzeSite } from '@/services/firecrawl/api';
import { CallDemo } from './call-demo';
import { APIError } from '@/utils/errors';

interface AnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AnalyzerModal({ isOpen, onClose }: AnalyzerModalProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisState, setAnalysisState] = useState<{
    business: any | null;
    phone: string | null;
    showCallDemo: boolean;
  }>({
    business: null,
    phone: null,
    showCallDemo: false
  });

  const handleSubmit = async ({ url, phone }: { url: string; phone: string }) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await analyzeSite(url);
      
      if (!result.business) {
        throw new APIError('No business data found in the response');
      }

      setAnalysisState({
        business: result.business,
        phone,
        showCallDemo: false
      });
    } catch (error) {
      console.error('Analysis error:', error);
      setError(
        error instanceof APIError 
          ? error.message 
          : 'Failed to analyze website. Please try again.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative bg-[#1A1642]/95 rounded-xl p-6 max-w-md w-full space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Website Analysis
          </h2>
          <p className="text-gray-300 mt-2">
            Enter your website URL to analyze
          </p>
        </div>

        {error && (
          <ErrorDisplay 
            error={error}
            onRetry={() => {
              setError(null);
              setIsAnalyzing(false);
              setAnalysisState({
                business: null,
                phone: null,
                showCallDemo: false
              });
            }}
          />
        )}

        {isAnalyzing ? (
          <LoadingAnimation />
        ) : analysisState.business ? (
          analysisState.showCallDemo ? (
            <CallDemo 
              business={analysisState.business}
              phoneNumber={analysisState.phone!}
            />
          ) : (
            <BusinessDetails 
              data={{ business: analysisState.business }}
              onContinue={() => setAnalysisState(prev => ({
                ...prev,
                showCallDemo: true
              }))}
            />
          )
        ) : (
          <WebsiteForm 
            onSubmit={handleSubmit}
            isLoading={isAnalyzing}
          />
        )}
      </div>
    </div>
  );
}