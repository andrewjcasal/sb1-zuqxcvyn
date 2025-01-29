import React, { useState, useEffect } from 'react';
import { Phone, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { CallService } from '@/services/bland/call-service';
import { BusinessInfo } from '@/types/business';
import { APIError } from '@/utils/errors';
import { FeedbackForm } from './feedback-form';

interface CallDemoProps {
  business: BusinessInfo;
  phoneNumber: string;
}

export function CallDemo({ business, phoneNumber }: CallDemoProps) {
  const [isInitiating, setIsInitiating] = useState(false);
  const [callId, setCallId] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'calling' | 'connected' | 'completed' | 'failed'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    let statusInterval: number;

    if (callId && status === 'calling') {
      statusInterval = window.setInterval(async () => {
        try {
          const callService = CallService.getInstance();
          const response = await callService.getCallStatus(callId);

          switch (response.status) {
            case 'completed':
              setStatus('completed');
              setShowFeedback(true);
              clearInterval(statusInterval);
              break;
            case 'failed':
              setStatus('failed');
              setError(response.error || 'Call failed');
              clearInterval(statusInterval);
              break;
            case 'in-progress':
              setStatus('connected');
              break;
          }
        } catch (error) {
          setStatus('failed');
          setError(error instanceof APIError ? error.message : 'Failed to check call status');
          clearInterval(statusInterval);
        }
      }, 2000);
    }

    return () => {
      if (statusInterval) {
        clearInterval(statusInterval);
      }
    };
  }, [callId, status]);

  const initiateCall = async () => {
    setIsInitiating(true);
    setError(null);
    setShowFeedback(false);

    try {
      const callService = CallService.getInstance();
      const response = await callService.initiateCall({
        phoneNumber,
        businessInfo: business
      });

      setCallId(response.id);
      setStatus('calling');
    } catch (error) {
      setError(error instanceof APIError ? error.message : 'Failed to initiate call');
      setStatus('failed');
    } finally {
      setIsInitiating(false);
    }
  };

  const handleFeedbackSubmit = () => {
    setShowFeedback(false);
    setStatus('idle');
    setCallId(null);
  };

  if (showFeedback && callId) {
    return (
      <FeedbackForm
        businessId={business.name}
        callId={callId}
        onSubmit={handleFeedbackSubmit}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-cyan-300 mb-2">
          Live Call Demo
        </h3>
        <p className="text-gray-300">
          Test the AI voice agent with a real call
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-400 p-4 rounded-lg text-center">
          {error}
        </div>
      )}

      {status === 'completed' && (
        <div className="bg-green-500/10 text-green-400 p-4 rounded-lg text-center flex items-center justify-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Call completed successfully
        </div>
      )}

      <Button
        onClick={initiateCall}
        disabled={isInitiating || status === 'calling' || status === 'connected'}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
      >
        <div className="flex items-center justify-center gap-2">
          {status === 'calling' ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Connecting...
            </>
          ) : status === 'connected' ? (
            <>
              <Phone className="w-4 h-4 animate-pulse" />
              Call in Progress
            </>
          ) : (
            <>
              <Phone className="w-4 h-4" />
              Start Live Call
            </>
          )}
        </div>
      </Button>

      <p className="text-sm text-gray-400 text-center">
        {status === 'idle' && "Click to start a live call with our AI voice agent"}
        {status === 'calling' && "Connecting your call..."}
        {status === 'connected' && "You're connected with our AI voice agent"}
        {status === 'completed' && "Call ended. Please provide your feedback"}
        {status === 'failed' && "Call failed. Please try again"}
      </p>
    </div>
  );
}