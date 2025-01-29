export interface OpenAIConfig {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface CompletionOptions extends OpenAIConfig {
  stream?: boolean;
}