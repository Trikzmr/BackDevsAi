import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Moon, Sun, Bell, ChevronDown, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Topbar = ({ onMenuToggle }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm border-b border-[#1f2937] px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden text-[#9ca3af] hover:text-[#3b82f6] transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="hidden sm:block">
            <h1 className="text-xl font-semibold">Welcome back, {user?.name || 'User'}!</h1>
            <p className="text-sm text-[#9ca3af]">Ready to build something amazing?</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#3b82f6] rounded-full"></span>
          </button>
          
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
            >
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden sm:block">{user?.name || 'User'}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-lg border border-[#1f2937] shadow-xl z-50">
                <div className="p-3 border-b border-[#1f2937]">
                  <p className="font-medium">{user?.name || 'User'}</p>
                  <p className="text-sm text-[#9ca3af]">{user?.email || 'user@example.com'}</p>
                </div>
                <div className="py-2">
                  <button className="w-full flex items-center px-3 py-2 text-left hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-3 py-2 text-left hover:bg-[rgba(255,255,255,0.05)] transition-colors text-red-400"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;