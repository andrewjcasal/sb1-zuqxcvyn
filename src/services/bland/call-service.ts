import { API_CONFIG } from '@/config/api';
import { BLAND_CONFIG } from './config';
import { BusinessInfo } from '@/types/business';
import { APIError } from '@/utils/errors';
import { generateCallScript } from './prompts/call-script';

interface CallOptions {
  phoneNumber: string;
  businessInfo: BusinessInfo;
}

interface CallResponse {
  id: string;
  status: 'queued' | 'in-progress' | 'completed' | 'failed';
  error?: string;
}

export class CallService {
  private static instance: CallService;
  private readonly apiKey: string;

  private constructor() {
    this.apiKey = API_CONFIG.BLAND.KEY;

    if (!this.apiKey) {
      throw new APIError('Bland.ai API key is required for voice calls');
    }
  }

  static getInstance(): CallService {
    if (!CallService.instance) {
      CallService.instance = new CallService();
    }
    return CallService.instance;
  }

  async initiateCall({ phoneNumber, businessInfo }: CallOptions): Promise<CallResponse> {
    try {
      const script = generateCallScript(businessInfo);

      const response = await fetch(`${API_CONFIG.BLAND.URL}/v1/calls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          task: script,
          voice_id: BLAND_CONFIG.VOICE.VOICE_ID,
          temperature: BLAND_CONFIG.VOICE.TEMPERATURE,
          reduce_latency: BLAND_CONFIG.VOICE.REDUCE_LATENCY,
          max_duration: BLAND_CONFIG.CALL.MAX_DURATION,
          end_on_silence: BLAND_CONFIG.CALL.END_ON_SILENCE,
          silence_timeout: BLAND_CONFIG.CALL.SILENCE_TIMEOUT,
          record: BLAND_CONFIG.CALL.RECORD
        })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new APIError(error.message || 'Failed to initiate call');
      }

      return await response.json();
    } catch (error) {
      console.error('Error initiating call:', error);
      throw error instanceof APIError ? error : new APIError('Failed to initiate call');
    }
  }

  async getCallStatus(callId: string): Promise<CallResponse> {
    try {
      const response = await fetch(`${API_CONFIG.BLAND.URL}/v1/calls/${callId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new APIError('Failed to get call status');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting call status:', error);
      throw error instanceof APIError ? error : new APIError('Failed to get call status');
    }
  }
}