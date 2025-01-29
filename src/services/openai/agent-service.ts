import { BusinessInfo } from '@/types/business';
import { OpenAIClient } from './api/client';
import { generateAgentPrompt } from './prompts/agent-prompt';
import { AgentPersona } from './types/agent';
import { APIError } from '@/utils/errors';

export class AgentService {
  private client: OpenAIClient;

  constructor() {
    try {
      this.client = new OpenAIClient();
    } catch (error) {
      console.warn('Failed to initialize OpenAI client:', error);
      throw error;
    }
  }

  private parseAgentPersona(content: string): AgentPersona {
    try {
      // First try direct JSON parsing
      const parsed = JSON.parse(content);
      if (this.validatePersonaFormat(parsed)) {
        return parsed;
      }
    } catch (error) {
      console.debug('Direct JSON parsing failed, attempting to extract JSON from text');
    }

    try {
      // Try to extract JSON from text if direct parsing fails
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const extracted = JSON.parse(jsonMatch[0]);
        if (this.validatePersonaFormat(extracted)) {
          return extracted;
        }
      }
    } catch (error) {
      console.debug('JSON extraction failed, falling back to default persona');
    }

    // If all parsing attempts fail, return a default persona
    return this.createDefaultPersona();
  }

  private validatePersonaFormat(data: any): data is AgentPersona {
    return (
      typeof data === 'object' &&
      typeof data.name === 'string' &&
      typeof data.voice === 'string' &&
      typeof data.personality === 'string' &&
      typeof data.knowledge === 'string'
    );
  }

  private createDefaultPersona(business?: BusinessInfo): AgentPersona {
    return {
      name: "Maya",
      voice: "Professional, friendly female voice with a natural American accent",
      personality: "Helpful, knowledgeable, and professional with a warm demeanor",
      knowledge: business ? 
        `Expert in ${business.industry} with focus on ${business.services.map(s => s.name).join(', ')}` :
        "Expert in customer service and business communication"
    };
  }

  async generatePersona(business: BusinessInfo): Promise<AgentPersona> {
    try {
      const systemPrompt = generateAgentPrompt({
        businessName: business.name,
        services: business.services.map(s => s.name),
        faqs: business.faqs || [],
        hours: business.hours,
        contact: business.contact,
        promotions: business.promotions || []
      });

      const response = await this.client.createCompletion([
        { role: 'system', content: systemPrompt },
        { 
          role: 'user', 
          content: 'Generate a voice agent persona in valid JSON format with the following fields: name, voice, personality, and knowledge.'
        }
      ], {
        temperature: 0.7,
        maxTokens: 500
      });

      if (!response.choices?.[0]?.message?.content) {
        console.warn('Empty response from OpenAI, using default persona');
        return this.createDefaultPersona(business);
      }

      const persona = this.parseAgentPersona(response.choices[0].message.content);
      console.debug('Generated persona:', persona);
      return persona;

    } catch (error) {
      console.error('Error generating agent persona:', error);
      // Return default persona instead of throwing error
      return this.createDefaultPersona(business);
    }
  }
}