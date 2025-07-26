import React from 'react';
import { Message } from '../types';
import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface MessageBubbleProps {
  message: Message;
  onSendMessage?: (content: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onSendMessage }) => {
  const isUser = message.sender === 'user';
  
  // Helper to render followup as clickable
  const renderFollowup = (followup: any, idx: number) => {
    const text = typeof followup === 'string'
      ? followup
      : (followup && typeof followup === 'object' && 'question' in followup)
        ? followup.question
        : JSON.stringify(followup);
    if (onSendMessage && text) {
      return (
        <button
          key={idx}
          className="text-xs text-blue-600 mt-1 underline hover:text-blue-800 transition-colors block text-left"
          onClick={() => onSendMessage(text)}
          type="button"
        >
          {text}
        </button>
      );
    }
    return (
      <p key={idx} className="text-xs text-gray-600 mt-1">{text}</p>
    );
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start gap-2 max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-blue-500' : 'bg-gray-200'
        }`}>
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-gray-600" />
          )}
        </div>
        
        <div className={`message-bubble ${isUser ? 'user-message' : 'bot-message'}`}>
          <div className="text-sm leading-relaxed">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
          
          {message.followup && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500 font-medium">Follow-up:</p>
              {Array.isArray(message.followup) ? (
                message.followup.map((f, idx) => renderFollowup(f, idx))
              ) : typeof message.followup === 'object' ? (
                renderFollowup(message.followup, 0)
              ) : (
                renderFollowup(message.followup, 0)
              )}
            </div>
          )}
          
          <div className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-gray-400'}`}>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble; 