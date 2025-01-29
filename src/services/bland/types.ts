export interface BlandAPIConfig {
  apiKey: string;
}

export interface BlandKnowledgeBase {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export interface BlandKnowledgeBaseContent {
  id: string;
  knowledge_base_id: string;
  content: string;
  metadata?: Record<string, any>;
}

export interface BlandCallOptions {
  phoneNumber: string;
  task: string;
  knowledgeBaseId?: string;
  voice?: {
    voice_id?: number;
    temperature?: number;
    reduce_latency?: boolean;
  };
  recordCall?: boolean;
  maxDuration?: number;
  endCallOnSilence?: boolean;
  silenceTimeoutSeconds?: number;
}

export interface BlandCallResponse {
  id: string;
  status: 'queued' | 'in-progress' | 'completed' | 'failed';
  recordingUrl?: string;
  error?: string;
  transcript?: string;
  call_data?: {
    duration: number;
    cost: number;
    amd_result?: string;
  };
}

export interface BlandError {
  error: string;
  status: number;
}