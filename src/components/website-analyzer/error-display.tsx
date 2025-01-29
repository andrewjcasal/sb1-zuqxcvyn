import React from 'react';
import { AlertCircle, RefreshCw, Globe, Lock, Clock } from 'lucide-react';
import { Button } from '../ui/button';

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
}

export function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  // Extract error code if present in error message
  const codeMatch = error.match(/\((\w+)\)/);
  const errorCode = codeMatch ? codeMatch[1] : null;

  // Determine if error is retryable based on error code
  const isRetryable = !errorCode || 
    ['TIMEOUT', 'NETWORK_ERROR', 'RATE_LIMIT_EXCEEDED', 'SERVER_ERROR'].includes(errorCode);

  // Get appropriate icon based on error type
  const ErrorIcon = getErrorIcon(errorCode);

  return (
    <div className="bg-red-500/10 rounded-lg p-6 space-y-4">
      <div className="flex items-start gap-3">
        <ErrorIcon className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
        <div className="space-y-2">
          <h4 className="font-semibold text-red-400">Analysis Failed</h4>
          <p className="text-gray-300">{error}</p>
          
          {/* Show helpful suggestions based on error code */}
          {errorCode === 'NOT_FOUND' && (
            <ul className="text-sm text-gray-400 list-disc list-inside mt-2">
              <li>Double-check the website URL for typos</li>
              <li>Make sure the website is publicly accessible</li>
              <li>Try using the website's homepage URL instead</li>
            </ul>
          )}
          
          {errorCode === 'ACCESS_DENIED' && (
            <ul className="text-sm text-gray-400 list-disc list-inside mt-2">
              <li>The website might require authentication</li>
              <li>Try a different page on the website</li>
              <li>Verify you have permission to access this site</li>
            </ul>
          )}
          
          {errorCode === 'NETWORK_ERROR' && (
            <ul className="text-sm text-gray-400 list-disc list-inside mt-2">
              <li>Check your internet connection</li>
              <li>Verify the website is currently online</li>
              <li>Try again in a few moments</li>
            </ul>
          )}
          
          {errorCode === 'TIMEOUT' && (
            <ul className="text-sm text-gray-400 list-disc list-inside mt-2">
              <li>The website might be slow or unresponsive</li>
              <li>Try analyzing a smaller page</li>
              <li>Try again when the website is more responsive</li>
            </ul>
          )}

          {errorCode === 'RATE_LIMIT_EXCEEDED' && (
            <p className="text-sm text-gray-400 mt-2">
              We're experiencing high demand. Please wait a moment before trying again.
            </p>
          )}
        </div>
      </div>

      {isRetryable && onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 hover:bg-white/5"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}

function getErrorIcon(errorCode: string | null) {
  switch (errorCode) {
    case 'NOT_FOUND':
    case 'NETWORK_ERROR':
      return Globe;
    case 'ACCESS_DENIED':
    case 'CRAWLING_DISALLOWED':
      return Lock;
    case 'TIMEOUT':
    case 'RATE_LIMIT_EXCEEDED':
      return Clock;
    default:
      return AlertCircle;
  }
}