import React from 'react';
import { Plus, Search, FileText, Clock, Settings, User, ArrowUpRight } from 'lucide-react';

interface SidebarProps {
  onNewChat: () => void;
  onOpenSettings: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNewChat, onOpenSettings }) => {
  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
        <div className="w-6 h-6 text-white font-bold text-lg">F</div>
      </div>
      
      {/* Navigation Icons */}
      <div className="flex flex-col space-y-4">
        <button 
          onClick={onNewChat}
          className="sidebar-icon"
          title="New Chat"
        >
          <Plus className="w-5 h-5" />
        </button>
        
        <button className="sidebar-icon" title="Search">
          <Search className="w-5 h-5" />
        </button>
        
        <button className="sidebar-icon" title="Documents">
          <FileText className="w-5 h-5" />
        </button>
        
        <button className="sidebar-icon" title="History">
          <Clock className="w-5 h-5" />
        </button>
        
        <button 
          onClick={onOpenSettings}
          className="sidebar-icon" 
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
      
      {/* Bottom Section */}
      <div className="mt-auto flex flex-col items-center space-y-4">
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        
        <button className="text-xs text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
          <span>Visit site</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 