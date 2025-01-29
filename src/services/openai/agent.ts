import { API_CONFIG } from '@/config/api';
import { BusinessInfo } from '@/types/business';
import { generateSystemPrompt } from './prompts';
import { AgentPersona, OpenAIResponse } from './types';

export async function generateAgentPersona(business: BusinessInfo): Promise<AgentPersona> {
  if (!API_CONFIG.OPENAI.KEY) {
    throw new Error('OpenAI API key is not configured');
  }

  const systemPrompt = generateSystemPrompt(business);
  
  try {
    const response = await fetch(API_CONFIG.OPENAI.URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_CONFIG.OPENAI.KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { 
            role: 'user', 
            content: 'Generate a voice agent persona including name, voice type, personality traits, and key knowledge areas.'
          }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate agent persona');
    }

    const data: OpenAIResponse = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    return {
      name: result.name,
      voice: result.voice,
      personality: result.personality,
      knowledge: result.knowledge
    };
  } catch (error) {
    console.error('Error generating agent persona:', error);
    throw error;
  }
}