export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIResponse {
  id: string;
  choices: {
    message: Message;
    finish_reason: string;
  }[];
}

export interface AgentPersona {
  name: string;
  voice: string;
  personality: string;
  knowledge: string;
}