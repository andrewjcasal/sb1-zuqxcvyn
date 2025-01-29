import { BusinessInfo } from '@/types/business';
import { AgentPersona } from './types';

export async function generateAgentPersona(business: BusinessInfo): Promise<AgentPersona> {
  // For demo purposes, return a mock agent persona
  return {
    name: "Maya",
    voice: "Professional, Young American Female",
    personality: "Friendly, knowledgeable, and professional. Excellent at building rapport while maintaining efficiency",
    knowledge: `Expert in ${business.industry} with deep understanding of ${business.services.map(s => s.name).join(', ')}`
  };
}