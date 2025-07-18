import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Key, 
  Code, 
  Activity, 
  FileText, 
  Settings, 
  Cpu,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, onToggle }) => {
  const menuItems = [
    { id: 'dashboard', path: '/dashboard/home', icon: Home, label: 'Dashboard' },
    { id: 'api-keys', path: '/dashboard/api-keys', icon: Key, label: 'API Keys' },
    // { id: 'playground', path: '/dashboard/playground', icon: Code, label: 'Playground' },
    // { id: 'logs', path: '/dashboard/logs', icon: Activity, label: 'Usage Logs' },
    { id: 'docs', path: '/dashboard/docs', icon: FileText, label: 'API Docs' },
    // { id: 'settings', path: '/dashboard/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[rgba(255,255,255,0.02)] backdrop-blur-sm border-r border-[#1f2937] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-[#1f2937]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] rounded-lg flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">BackDevsAI</span>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden text-[#9ca3af] hover:text-[#3b82f6] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onToggle}
                className={({ isActive }) => `
                  w-full flex items-center px-6 py-3 text-left transition-all duration-200 hover:bg-[rgba(255,255,255,0.05)] ${
                    isActive
                      ? 'bg-[rgba(59,130,246,0.1)] text-[#3b82f6] border-r-2 border-[#3b82f6]'
                      : 'text-[#9ca3af] hover:text-[#e5e5e5]'
                  }
                `}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;