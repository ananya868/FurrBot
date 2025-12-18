export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  followup?: string | string[] | any;
}

export interface ChatConfig {
  llmProvider: string;
  llmModel: string;
  namespace: string;
}

export interface ApiRequest {
  question: string;
  namespace: string;
  llm_provider: string;
  llm_model: string;
  previous_conversation: Array<{
    role: string;
    content: string;
  }>;
}

export interface ApiResponse {
  answer: string;
  followup: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  uptime_seconds: number;
  memory_usage_mb: number;
  active_instances: number;
  instances: string[];
  db_status: string;
  llm_status: string;
} 