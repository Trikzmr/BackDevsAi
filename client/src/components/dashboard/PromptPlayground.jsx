import React, { useState } from 'react';
import { Send, Copy, RefreshCw, Zap } from 'lucide-react';

const PromptPlayground = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');

  const examples = [
    {
      title: 'Create User API',
      prompt: 'Create a REST API endpoint for user registration with email validation and password hashing'
    },
    {
      title: 'Authentication System',
      prompt: 'Build a JWT-based authentication system with refresh tokens and role-based access control'
    },
    {
      title: 'Database Schema',
      prompt: 'Design a database schema for a blog application with users, posts, and comments'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResponse = {
      code: `// Generated API endpoint
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  
  // Validate email format
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Save user to database
  const user = await User.create({
    email,
    password: hashedPassword
  });
  
  res.status(201).json({ 
    message: 'User created successfully',
    userId: user.id 
  });
});`,
      explanation: 'This endpoint handles user registration with email validation and secure password hashing using bcrypt.'
    };

    setResponse(JSON.stringify(mockResponse, null, 2));
    setIsLoading(false);
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(response);
  };

  const loadExample = (examplePrompt) => {
    setPrompt(examplePrompt);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Prompt Playground</h2>
        <p className="text-[#9ca3af]">Test your prompts and see AI-generated backend code in real-time</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-xl border border-[#1f2937] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Input Prompt</h3>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="bg-[rgba(255,255,255,0.05)] border border-[#1f2937] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5">GPT-3.5 Turbo</option>
                <option value="claude">Claude</option>
              </select>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-48 px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[#1f2937] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Describe the backend functionality you want to create..."
              />
              
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="w-full bg-[#3b82f6] hover:bg-[#2563eb] disabled:bg-[#3b82f6]/50 text-white py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-[#3b82f6]/25 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Generate Code
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Examples */}
          <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-xl border border-[#1f2937] p-6">
            <h3 className="text-lg font-semibold mb-4">Examples</h3>
            <div className="space-y-2">
              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => loadExample(example.prompt)}
                  className="w-full text-left p-3 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] rounded-lg border border-[#1f2937] hover:border-[#3b82f6]/50 transition-all duration-200"
                >
                  <h4 className="font-medium text-[#3b82f6] mb-1">{example.title}</h4>
                  <p className="text-sm text-[#9ca3af]">{example.prompt}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-xl border border-[#1f2937] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Generated Response</h3>
            {response && (
              <button
                onClick={copyResponse}
                className="p-2 hover:bg-[rgba(255,255,255,0.1)] rounded transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="h-[400px] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Zap className="w-12 h-12 text-[#3b82f6] mx-auto mb-4 animate-pulse" />
                  <p className="text-[#9ca3af]">AI is generating your backend code...</p>
                </div>
              </div>
            ) : response ? (
              <pre className="text-sm text-[#e5e5e5] whitespace-pre-wrap bg-[rgba(255,255,255,0.05)] p-4 rounded-lg border border-[#1f2937]">
                {response}
              </pre>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Code className="w-12 h-12 text-[#9ca3af] mx-auto mb-4" />
                  <p className="text-[#9ca3af]">Your generated code will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptPlayground;