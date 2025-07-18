import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { 
  Code, 
  Key, 
  Activity, 
  Zap, 
  ArrowRight, 
  Github, 
  FileText, 
  Mail,
  ChevronRight,
  Star,
  Users,
  Cpu
} from 'lucide-react';

import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

import Dashboard from './components/Dashboard';
import DashboardHome from './components/dashboard/DashboardHome';
import ApiKeys from './components/dashboard/ApiKeys';
import PromptPlayground from './components/dashboard/PromptPlayground';
import UsageLogs from './components/dashboard/UsageLogs';
import ApiDocs from './components/dashboard/ApiDocs';
import Settings from './components/dashboard/Settings';

import { AuthProvider, useAuth } from './context/AuthContext';

// ✅ Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// ✅ Public Route Wrapper
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard/home" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#0f0f0f] text-[#e5e5e5] overflow-x-hidden">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />

            {/* Protected Nested Dashboard Routes */}
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<DashboardHome />} />
              <Route path="api-keys" element={<ApiKeys />} />
              <Route path="playground" element={<PromptPlayground />} />
              <Route path="logs" element={<UsageLogs />} />
              <Route path="docs" element={<ApiDocs />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
      <footer className="border-t border-[#1f2937] py-12 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f] text-[#e5e5e5] overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] rounded-lg flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">BackDevsAI</span>
              </div>
              <p className="text-[#9ca3af] text-sm">
                The future of backend development is here. Build faster with AI.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-[#9ca3af]">
                <li><a href="#" className="hover:text-[#3b82f6] transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-[#3b82f6] transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-[#3b82f6] transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-[#9ca3af]">
                <li>
                  <a href="#" className="hover:text-[#3b82f6] transition-colors flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Docs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#3b82f6] transition-colors flex items-center">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#3b82f6] transition-colors flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-[#9ca3af]">
                <li><a href="#" className="hover:text-[#3b82f6] transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-[#3b82f6] transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-[#3b82f6] transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#1f2937] mt-8 pt-8 text-center text-[#9ca3af]">
            <p>&copy; 2025 BackDevsAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </AuthProvider>
  );
}

export default App;
