import { Message, ChatConfig } from '../types';

const STORAGE_KEYS = {
  MESSAGES: 'furrbot_messages',
  CONFIG: 'furrbot_config',
} as const;

export const storage = {
  // Messages
  getMessages(): Message[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      if (!stored) return [];
      
      const messages = JSON.parse(stored);
      return messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
    } catch (error) {
      console.error('Error loading messages:', error);
      return [];
    }
  },

  saveMessages(messages: Message[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  },

  clearMessages(): void {
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
  },

  // Configuration
  getConfig(): ChatConfig {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (!stored) {
        return {
          llmProvider: 'openai',
          llmModel: 'gpt-4',
          namespace: 'pets',
        };
      }
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error loading config:', error);
      return {
        llmProvider: 'openai',
        llmModel: 'gpt-4',
        namespace: 'pets',
      };
    }
  },

  saveConfig(config: ChatConfig): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    } catch (error) {
      console.error('Error saving config:', error);
    }
  },
}; 