import React from 'react';
import { Message } from '../types';
import { User, Bot, Sparkles } from 'lucide-react';
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
          className="text-xs text-gray-500 hover:text-gray-900 transition-colors block text-left mt-1.5 flex items-center gap-1 group"
          onClick={() => onSendMessage(text)}
          type="button"
        >
          <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="underline decoration-gray-300 hover:decoration-gray-900 underline-offset-2">{text}</span>
        </button>
      );
    }
    return (
      <p key={idx} className="text-xs text-gray-500 mt-1">{text}</p>
    );
  };

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`flex items-end gap-3 max-w-[85%] lg:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>

        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${isUser ? 'bg-gray-900' : 'bg-white border border-gray-200'
          }`}>
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-gray-700" />
          )}
        </div>

        {/* Bubble */}
        <div className={`group relative px-5 py-3.5 shadow-sm text-sm leading-6 tracking-wide ${isUser
          ? 'bg-gray-900 text-white rounded-2xl rounded-br-sm'
          : 'bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-sm'
          }`}>
          <div className="markdown-content">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-0 last:mb-0">{children}</p>,
                code: ({ children }) => <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800 font-mono text-xs">{children}</code>
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>

          {message.followup && !isUser && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Suggested Follow-up</p>
              <div className="flex flex-col gap-0.5">
                {Array.isArray(message.followup) ? (
                  (message.followup as any[]).slice(0, 3).map((f: any, idx: number) => renderFollowup(f, idx))
                ) : (
                  renderFollowup(message.followup, 0)
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
