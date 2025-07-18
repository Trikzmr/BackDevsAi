import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Cpu, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await fetch('https://backdevsai.onrender.com/api/auth/login', {
      method: 'POST',
      credentials: 'include', // ⬅️ IMPORTANT to accept cookies from server
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailOrUsername: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || 'Login failed');
      setIsLoading(false);
      return;
    }

    // Store user info using context or local storage if needed
    login({ email: data.user.email, name: data.user.fullName });
    
    setIsLoading(false);
    navigate('/dashboard/home');

  } catch (error) {
    console.error('Login error:', error);
    alert('Something went wrong. Please try again.');
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 to-[#1d4ed8]/5"></div>
      
      <div className="relative max-w-md w-full">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-[#3b82f6]/10 rounded-full blur-3xl"></div>
        
        <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-2xl border border-[#1f2937] p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-[#9ca3af] hover:text-[#3b82f6] transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to home
            </Link>
            
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] rounded-lg flex items-center justify-center">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">BackDevsAI</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-[#9ca3af]">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[#1f2937] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[#1f2937] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all duration-200 pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9ca3af] hover:text-[#3b82f6] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 text-[#3b82f6] bg-[rgba(255,255,255,0.05)] border-[#1f2937] rounded focus:ring-[#3b82f6] focus:ring-2"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-[#9ca3af]">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-[#3b82f6] hover:text-[#2563eb] transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3b82f6] hover:bg-[#2563eb] disabled:bg-[#3b82f6]/50 text-white py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-[#3b82f6]/25 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2 focus:ring-offset-[#0f0f0f]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-[#9ca3af]">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-[#3b82f6] hover:text-[#2563eb] transition-colors font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;