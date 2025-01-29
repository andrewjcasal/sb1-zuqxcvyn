export interface AgentPersona {
  name: string;
  voice: string;
  personality: string;
  knowledge: string;
}

export interface AgentConfig {
  businessName: string;
  services: string[];
  faqs: Array<{ question: string; answer: string }>;
  hours: {
    days: string;
    hours: string;
    emergencyService?: boolean;
  };
  contact: {
    phone?: string;
    email?: string;
  };
  promotions?: Array<{
    title: string;
    description: string;
  }>;
}