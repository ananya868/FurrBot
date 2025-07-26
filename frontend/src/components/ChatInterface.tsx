import React, { useState, useEffect, useRef } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import Welcome from './Welcome';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import Settings from './Settings';
import { Message, ChatConfig } from '../types';
import { chatApi } from '../services/api';
import { storage } from '../services/storage';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<ChatConfig>(storage.getConfig());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages on component mount
  useEffect(() => {
    const savedMessages = storage.getMessages();
    setMessages(savedMessages);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    storage.saveMessages(messages);
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Prepare conversation history for API
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content,
      }));

      const response = await chatApi.askQuestion({
        question: content,
        namespace: config.namespace,
        llm_provider: config.llmProvider,
        llm_model: config.llmModel,
        previous_conversation: conversationHistory,
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.answer,
        sender: 'bot',
        timestamp: new Date(),
        followup: response.followup,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfigChange = (newConfig: ChatConfig) => {
    setConfig(newConfig);
    storage.saveConfig(newConfig);
  };

  const handleNewChat = () => {
    if (window.confirm('Are you sure you want to start a new chat?')) {
      setMessages([]);
      storage.clearMessages();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl flex flex-col min-h-[80vh]">
        {/* Top bar with settings */}
        <div className="flex justify-end items-center p-4 border-b border-gray-200">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-purple-600 transition-colors"
            title="Settings"
          >
            <SettingsIcon className="w-6 h-6" />
          </button>
        </div>
        {/* Main chat area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <Welcome onSendMessage={handleSendMessage} />
          ) : (
            <div className="content-area">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} onSendMessage={handleSendMessage} />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 text-sm">
            {error}
          </div>
        )}
        {/* Input Area */}
        <MessageInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
      {/* Settings Modal */}
      <Settings
        config={config}
        onConfigChange={handleConfigChange}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default ChatInterface; 