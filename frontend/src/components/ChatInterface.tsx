import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import Welcome from './Welcome';
import MessageBubble from './MessageBubble';
import NamespaceSelector from './NamespaceSelector';
import { Message, ChatConfig } from '../types';
import { chatApi } from '../services/api';
import { storage } from '../services/storage';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<ChatConfig>(storage.getConfig());
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages
  useEffect(() => {
    setMessages(storage.getMessages());
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Save messages
  useEffect(() => {
    storage.saveMessages(messages);
  }, [messages]);

  const handleNamespaceChange = (newNamespace: string) => {
    const newConfig = { ...config, namespace: newNamespace };
    setConfig(newConfig);
    storage.saveConfig(newConfig);
  };

  const handleSendMessage = async (input?: string | React.FormEvent) => {
    // Handle both form submission and direct string input (from follow-ups)
    let content = '';

    if (typeof input === 'string') {
      content = input;
    } else {
      input?.preventDefault();
      content = inputValue;
    }

    if (!content.trim() || isLoading) return;

    setInputValue('');

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
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

      // Simple filter to remove duplicate follow-up text if LLM includes it
      let cleanAnswer = response.answer;
      const followUpIndicators = ['Follow-up questions:', 'Suggested follow-up:', 'Follow up:', 'Questions you might ask:', 'Suggested questions:'];
      for (const indicator of followUpIndicators) {
        // Case insensitive search
        const idx = cleanAnswer.toLowerCase().lastIndexOf(indicator.toLowerCase());
        if (idx !== -1 && idx > cleanAnswer.length * 0.7) { // Only cut if it's in the last 30% of the message
          // Cut everything after and including the indicator
          cleanAnswer = cleanAnswer.substring(0, idx).trim();
          break;
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: cleanAnswer,
        sender: 'bot',
        timestamp: new Date(),
        followup: response.followup,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Error:', err);
      // Wait a bit before showing error to avoid flash
      await new Promise(resolve => setTimeout(resolve, 500));
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, something went wrong. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="flex flex-col w-full max-w-5xl h-[calc(100vh-2rem)] bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-900 rounded-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">FurrBot</h1>
              <p className="text-xs text-gray-500">AI Assistant</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <NamespaceSelector
              currentNamespace={config.namespace}
              onNamespaceChange={handleNamespaceChange}
            />
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin">
          {messages.length === 0 ? (
            <Welcome
              onSendMessage={handleSendMessage}
              currentNamespace={config.namespace}
            />
          ) : (
            messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onSendMessage={handleSendMessage}
              />
            ))
          )}

          {isLoading && (
            <div className="flex justify-start animate-slide-up">
              <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-gray-100">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-3 max-w-4xl mx-auto bg-gray-50 p-2 rounded-xl border border-gray-200 focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-200 transition-all duration-200"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Ask about ${config.namespace.toLowerCase()}...`}
              className="flex-1 bg-transparent px-4 py-2 focus:outline-none text-gray-700 placeholder-gray-400"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className={`p-2 rounded-lg transition-all duration-200 
                ${inputValue.trim() && !isLoading
                  ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-md'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-3">
            AI can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
