import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

import { NAMESPACE_QUESTIONS } from '../constants/questions';
import { NamespaceKey } from '../constants/namespaces';

interface WelcomeProps {
  onSendMessage: (message: string) => void;
  currentNamespace: string;
}

const Welcome: React.FC<WelcomeProps> = ({ onSendMessage, currentNamespace }) => {
  const suggestions = NAMESPACE_QUESTIONS[currentNamespace as NamespaceKey] ||
    NAMESPACE_QUESTIONS['dogs']; // Fallback to dogs if something goes wrong

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
      <div className="mb-8 relative">
        <div className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 transition-transform hover:rotate-6 duration-300">
          <Bot className="w-10 h-10 text-white" />
        </div>
        <div className="absolute -top-2 -right-2 bg-yellow-400 p-1.5 rounded-full shadow-sm animate-bounce">
          <Sparkles className="w-4 h-4 text-yellow-900" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
        Welcome to FurrBot
      </h2>
      <p className="text-gray-500 max-w-sm mb-12 leading-relaxed">
        Your AI companion for all things pets. Select a category above or start chatting below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSendMessage(suggestion)}
            className="group p-4 bg-white border border-gray-100 hover:border-gray-300 rounded-xl text-left transition-all duration-200 hover:shadow-sm"
          >
            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
              {suggestion}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Welcome;
