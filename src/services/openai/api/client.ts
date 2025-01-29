import { API_CONFIG } from '@/config/api';
import { Message, OpenAIResponse } from '../types/api';
import { CompletionOptions } from './types';
import { DEFAULT_TEMPERATURE, OPENAI_MODELS } from '../constants';
import { APIError } from '@/utils/errors';

export class OpenAIClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = API_CONFIG.OPENAI.KEY;
    this.baseUrl = API_CONFIG.OPENAI.URL;

    // Don't throw error if key is missing, just log warning
    if (!this.apiKey) {
      console.warn('OpenAI API key not configured - using mock responses');
    }
  }

  async createCompletion(
    messages: Message[],
    options: CompletionOptions = {}
  ): Promise<OpenAIResponse> {
    // If no API key, return mock response
    if (!this.apiKey) {
      return this.getMockResponse();
    }

    const {
      model = OPENAI_MODELS.GPT4,
      temperature = DEFAULT_TEMPERATURE,
      maxTokens,
      stream = false
    } = options;

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
          max_tokens: maxTokens,
          stream
        })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
        throw new APIError(error.error?.message || `Failed to generate completion: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new APIError('Invalid response format from OpenAI API');
      }

      return data;
    } catch (error) {
      console.error('OpenAI API error:', error);
      // Fall back to mock response on error
      return this.getMockResponse();
    }
  }

  private getMockResponse(): OpenAIResponse {
    return {
      id: 'mock-response',
      choices: [{
        message: {
          role: 'assistant',
          content: JSON.stringify({
            name: "Maya",
            voice: "Professional, friendly female voice with a natural American accent",
            personality: "Helpful, knowledgeable, and professional with a warm demeanor",
            knowledge: "Expert in customer service and business communication"
          })
        },
        finish_reason: 'stop'
      }]
    };
  }
}