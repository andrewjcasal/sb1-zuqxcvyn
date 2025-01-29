import { BusinessInfo } from '@/types/business';
import { APIError } from '@/utils/errors';
import { API_ENDPOINTS } from '@/lib/config';

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

  private constructor() {}

  static getInstance(): CallService {
    if (!CallService.instance) {
      CallService.instance = new CallService();
    }
    return CallService.instance;
  }

  async initiateCall({ phoneNumber, businessInfo }: CallOptions): Promise<CallResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.CALL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          businessInfo,
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
      const response = await fetch(`${API_ENDPOINTS.CALL}?callId=${callId}`);

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