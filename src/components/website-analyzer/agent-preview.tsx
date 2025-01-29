import React, { useState, useEffect } from 'react';
import { User2, Mic2, Brain, BookOpen, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { WebsiteAnalysisService } from '@/services/orchestration/website-analysis-service';
import { BusinessInfo } from '@/types/business';
import { AgentPersona } from '@/services/openai/types/agent';
import { APIError } from '@/utils/errors';

interface AgentPreviewProps {
  agent: AgentPersona;
  business: BusinessInfo;
}

export function AgentPreview({ agent, business }: AgentPreviewProps) {
  const [isStartingCall, setIsStartingCall] = useState(false);
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'in-progress' | 'completed' | 'failed'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [statusInterval, setStatusInterval] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (statusInterval) {
        clearInterval(statusInterval);
      }
    };
  }, [statusInterval]);

  const handleStartCall = async () => {
    if (!business.contact?.phone) {
      setError('No phone number available for demo call.');
      return;
    }

    setIsStartingCall(true);
    setError(null);

    try {
      const analysisService = new WebsiteAnalysisService();
      const call = await analysisService.initiateCall(business, business.contact.phone);
      
      setCallStatus('connecting');
      
      // Poll for call status
      const interval = window.setInterval(async () => {
        try {
          const status = await analysisService.checkCallStatus(call.id);
          
          switch (status.status) {
            case 'completed':
              setCallStatus('completed');
              clearInterval(interval);
              setError('Demo call completed successfully.');
              break;
            case 'failed':
              setCallStatus('failed');
              clearInterval(interval);
              setError(status.error || 'Call failed. Please try again.');
              break;
            case 'in-progress':
              setCallStatus('in-progress');
              setError('Call in progress...');
              break;
          }
        } catch (error) {
          clearInterval(interval);
          setError(error instanceof APIError ? error.message : 'Failed to get call status');
          setCallStatus('failed');
        }
      }, 2000);

      setStatusInterval(interval);

    } catch (error) {
      setError(error instanceof APIError ? error.message : 'Failed to start call');
      setCallStatus('failed');
    } finally {
      setIsStartingCall(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Agent preview content remains the same */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-cyan-300 mb-2">
          Meet Your AI Voice Agent
        </h3>
        <p className="text-gray-300">
          Ready to handle calls professionally and convert leads
        </p>
      </div>

      <div className="grid gap-4">
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <User2 className="w-5 h-5 text-cyan-400" />
            <h4 className="font-medium text-white">Name</h4>
          </div>
          <p className="text-gray-300">{agent.name}</p>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Mic2 className="w-5 h-5 text-cyan-400" />
            <h4 className="font-medium text-white">Voice</h4>
          </div>
          <p className="text-gray-300">{agent.voice}</p>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-5 h-5 text-cyan-400" />
            <h4 className="font-medium text-white">Personality</h4>
          </div>
          <p className="text-gray-300">{agent.personality}</p>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <h4 className="font-medium text-white">Knowledge Areas</h4>
          </div>
          <p className="text-gray-300">{agent.knowledge}</p>
        </div>

        {business.contact?.phone && (
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Phone className="w-5 h-5 text-cyan-400" />
              <h4 className="font-medium text-white">Demo Call Number</h4>
            </div>
            <p className="text-gray-300">{business.contact.phone}</p>
          </div>
        )}
      </div>

      {error && (
        <div className={`p-4 rounded-lg text-center ${
          error.includes('completed') ? 'bg-green-500/10 text-green-400' :
          'bg-red-500/10 text-red-400'
        }`}>
          {error}
        </div>
      )}

      <Button
        onClick={handleStartCall}
        disabled={isStartingCall || callStatus === 'in-progress' || !business.contact?.phone}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 relative"
      >
        <div className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" />
          {isStartingCall ? 'Connecting...' : 
           callStatus === 'in-progress' ? 'Call in Progress...' :
           callStatus === 'completed' ? 'Start New Call' :
           'Start Demo Call'}
        </div>
        {callStatus === 'in-progress' && (
          <span className="absolute top-0 right-0 h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
        )}
      </Button>
    </div>
  );
}