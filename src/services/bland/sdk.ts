import { BLAND_CONFIG } from './config';
import { BlandAPIConfig, BlandCallOptions, BlandCallResponse, BlandError, BlandKnowledgeBase, BlandKnowledgeBaseContent } from './types';

export class BlandAPI {
  private readonly baseUrl: string;
  private readonly headers: HeadersInit;

  constructor(config: BlandAPIConfig) {
    if (!config.apiKey) {
      throw new Error('API key is required');
    }
    
    this.baseUrl = BLAND_CONFIG.API_URL;
    this.headers = {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    
    if (!response.ok) {
      let errorMessage = `HTTP error ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        // If response isn't JSON, use default error message
      }
      throw new Error(errorMessage);
    }
    
    try {
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Invalid response format from API');
    }
  }

  calls = {
    create: async (options: BlandCallOptions): Promise<BlandCallResponse> => {
      try {
        if (!options.phoneNumber.startsWith('+')) {
          throw new Error('Phone number must be in E.164 format (e.g., +1234567890)');
        }

        const requestBody = {
          phone_number: options.phoneNumber,
          task: options.task,
          voice_id: 0,
          reduce_latency: true,
          wait_for_greeting: true,
          record: true,
          temperature: 0.7,
          amd: {
            enabled: true,
            timeout: 30
          }
        };

        console.debug('Making Bland.ai API call with:', {
          url: `${this.baseUrl}/v1/calls`,
          headers: {
            ...this.headers,
            'Authorization': '[REDACTED]'
          },
          body: {
            ...requestBody,
            task: requestBody.task.substring(0, 50) + '...'
          }
        });

        const response = await fetch(`${this.baseUrl}/v1/calls`, {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify(requestBody)
        });

        return this.handleResponse<BlandCallResponse>(response);
      } catch (error) {
        console.error('Error creating call:', error);
        throw error;
      }
    },

    get: async (callId: string): Promise<BlandCallResponse> => {
      try {
        console.debug('Getting call status:', { callId });
        
        const response = await fetch(`${this.baseUrl}/v1/calls/${callId}`, {
          headers: this.headers
        });

        return this.handleResponse<BlandCallResponse>(response);
      } catch (error) {
        console.error('Error getting call status:', error);
        throw error;
      }
    }
  };
}