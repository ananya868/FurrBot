import React from 'react';
import { User, Mail, FileText, Settings, RefreshCw } from 'lucide-react';

interface WelcomeProps {
  onSendMessage: (message: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onSendMessage }) => {
  const promptCards = [
    {
      text: "What's the best food for my dog's breed?",
      icon: User,
      color: "text-blue-500"
    },
    {
      text: "How can I train my cat to use the litter box?",
      icon: Mail,
      color: "text-green-500"
    },
    {
      text: "What are common health issues in pets?",
      icon: FileText,
      color: "text-purple-500"
    },
    {
      text: "How often should I groom my pet?",
      icon: Settings,
      color: "text-orange-500"
    }
  ];

  return (
    <div className="content-area flex flex-col items-center justify-center text-center">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Hi there, <span className="text-purple-600">Pet Parent</span>
        </h1>
        <h2 className="text-2xl font-semibold text-gray-900">
          What would you like to know?
        </h2>
      </div>

      {/* Instructional Text */}
      <p className="text-gray-600 mb-8 max-w-md">
        Use one of the most common prompts below or use your own to begin
      </p>

      {/* Prompt Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-2xl w-full">
        {promptCards.map((card, index) => (
          <button
            key={index}
            onClick={() => onSendMessage(card.text)}
            className="prompt-card text-left"
          >
            <p className="text-sm text-gray-700 mb-3">{card.text}</p>
            <div className={`${card.color} flex justify-center`}>
              <card.icon className="w-4 h-4" />
            </div>
          </button>
        ))}
      </div>

      {/* Refresh Prompts */}
      <button className="text-sm text-gray-500 hover:text-purple-600 transition-colors flex items-center space-x-1 mb-8">
        <RefreshCw className="w-4 h-4" />
        <span>Refresh Prompts</span>
      </button>
    </div>
  );
};

export default Welcome; 