export interface GPTConfig {
  name: string;
  description: string;
  instructions: string;
  context?: string;
  model: string;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

