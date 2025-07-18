import React, { useState } from 'react';
import { 
  Copy, 
  ChevronDown, 
  ChevronRight, 
  Code, 
  Book, 
  ExternalLink,
  CheckCircle
} from 'lucide-react';

const ApiDocs = () => {
  const [expandedSections, setExpandedSections] = useState(['authentication']);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const toggleSection = (section) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
  };

  const codeExamples = {
    javascript: {
      authentication: `const response = await fetch('https://api.aibackdevs.com/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const data = await response.json();
console.log(data);`,
      users: `// Create a new user
const createUser = async (userData) => {
  const response = await fetch('https://api.aibackdevs.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify(userData)
  });
  
  return response.json();
};

// Get user by ID
const getUser = async (userId) => {
  const response = await fetch(\`https://api.aibackdevs.com/users/\${userId}\`, {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  });
  
  return response.json();
};`,
      webhooks: `// Set up webhook endpoint
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-aibackdevs-signature'];
  const payload = req.body;
  
  // Verify webhook signature
  const isValid = verifyWebhookSignature(payload, signature);
  
  if (isValid) {
    console.log('Webhook received:', payload);
    res.status(200).send('OK');
  } else {
    res.status(401).send('Unauthorized');
  }
});`
    },
    python: {
      authentication: `import requests

url = "https://api.aibackdevs.com/auth/login"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
}
data = {
    "email": "user@example.com",
    "password": "password123"
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`,
      users: `import requests

# Create a new user
def create_user(user_data):
    url = "https://api.aibackdevs.com/users"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
    }
    
    response = requests.post(url, headers=headers, json=user_data)
    return response.json()

# Get user by ID
def get_user(user_id):
    url = f"https://api.aibackdevs.com/users/{user_id}"
    headers = {
        "Authorization": "Bearer YOUR_API_KEY"
    }
    
    response = requests.get(url, headers=headers)
    return response.json()`,
      webhooks: `from flask import Flask, request, abort
import hmac
import hashlib

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    signature = request.headers.get('X-AIBackDevs-Signature')
    payload = request.get_json()
    
    # Verify webhook signature
    if verify_webhook_signature(payload, signature):
        print('Webhook received:', payload)
        return 'OK', 200
    else:
        abort(401)

def verify_webhook_signature(payload, signature):
    # Implementation depends on your webhook secret
    pass`
    },
    curl: {
      authentication: `curl -X POST https://api.aibackdevs.com/auth/login \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'`,
      users: `# Create a new user
curl -X POST https://api.aibackdevs.com/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'

# Get user by ID
curl -X GET https://api.aibackdevs.com/users/123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      webhooks: `# Configure webhook endpoint
curl -X POST https://api.aibackdevs.com/webhooks \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "url": "https://yourapp.com/webhook",
    "events": ["user.created", "user.updated"]
  }'`
    }
  };

  const sections = [
    {
      id: 'authentication',
      title: 'Authentication',
      description: 'Learn how to authenticate with the AIBackDevs API',
      endpoints: [
        {
          method: 'POST',
          path: '/auth/login',
          description: 'Authenticate user and get access token'
        },
        {
          method: 'POST',
          path: '/auth/refresh',
          description: 'Refresh access token'
        }
      ]
    },
    {
      id: 'users',
      title: 'Users',
      description: 'Manage user accounts and profiles',
      endpoints: [
        {
          method: 'GET',
          path: '/users',
          description: 'Get list of users'
        },
        {
          method: 'POST',
          path: '/users',
          description: 'Create a new user'
        },
        {
          method: 'GET',
          path: '/users/{id}',
          description: 'Get user by ID'
        },
        {
          method: 'PUT',
          path: '/users/{id}',
          description: 'Update user'
        },
        {
          method: 'DELETE',
          path: '/users/{id}',
          description: 'Delete user'
        }
      ]
    },
    {
      id: 'webhooks',
      title: 'Webhooks',
      description: 'Set up real-time notifications',
      endpoints: [
        {
          method: 'POST',
          path: '/webhooks',
          description: 'Create webhook endpoint'
        },
        {
          method: 'GET',
          path: '/webhooks',
          description: 'List webhook endpoints'
        },
        {
          method: 'DELETE',
          path: '/webhooks/{id}',
          description: 'Delete webhook'
        }
      ]
    }
  ];

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return 'bg-green-500/20 text-green-400';
      case 'POST': return 'bg-blue-500/20 text-blue-400';
      case 'PUT': return 'bg-yellow-500/20 text-yellow-400';
      case 'DELETE': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">API Documentation</h2>
          <p className="text-[#9ca3af]">Complete guide to integrating with AIBackDevs API</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-[rgba(255,255,255,0.05)] border border-[#1f2937] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="curl">cURL</option>
          </select>
          <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open API
          </button>
        </div>
      </div>

      {/* Quick Start */}
      <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-xl border border-[#1f2937] p-6">
        <div className="flex items-center mb-4">
          <CheckCircle className="w-5 h-5 text-[#3b82f6] mr-2" />
          <h3 className="text-xl font-semibold">Quick Start</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-[rgba(255,255,255,0.05)] rounded-lg">
            <div className="font-semibold mb-2">1. Get API Key</div>
            <p className="text-[#9ca3af]">Create an API key from your dashboard</p>
          </div>
          <div className="p-4 bg-[rgba(255,255,255,0.05)] rounded-lg">
            <div className="font-semibold mb-2">2. Make Request</div>
            <p className="text-[#9ca3af]">Include your API key in the Authorization header</p>
          </div>
          <div className="p-4 bg-[rgba(255,255,255,0.05)] rounded-lg">
            <div className="font-semibold mb-2">3. Handle Response</div>
            <p className="text-[#9ca3af]">Process the JSON response from the API</p>
          </div>
        </div>
      </div>

      {/* API Sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-xl border border-[#1f2937] overflow-hidden"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full p-6 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                  <p className="text-[#9ca3af]">{section.description}</p>
                </div>
                {expandedSections.includes(section.id) ? (
                  <ChevronDown className="w-5 h-5 text-[#9ca3af]" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-[#9ca3af]" />
                )}
              </div>
            </button>
            
            {expandedSections.includes(section.id) && (
              <div className="border-t border-[#1f2937] p-6 space-y-6">
                {/* Endpoints */}
                <div>
                  <h4 className="font-semibold mb-4">Endpoints</h4>
                  <div className="space-y-3">
                    {section.endpoints.map((endpoint, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.05)] rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(endpoint.method)}`}>
                            {endpoint.method}
                          </span>
                          <code className="text-sm">{endpoint.path}</code>
                        </div>
                        <span className="text-sm text-[#9ca3af]">{endpoint.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Code Example */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Example Code</h4>
                    <button
                      onClick={() => copyCode(codeExamples[selectedLanguage][section.id])}
                      className="p-2 hover:bg-[rgba(255,255,255,0.1)] rounded transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-[#e5e5e5] whitespace-pre-wrap">
                      {codeExamples[selectedLanguage][section.id]}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Support */}
      <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-xl border border-[#1f2937] p-6">
        <div className="flex items-center mb-4">
          <Book className="w-5 h-5 text-[#3b82f6] mr-2" />
          <h3 className="text-xl font-semibold">Need Help?</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Documentation</h4>
            <p className="text-[#9ca3af] text-sm mb-3">
              Check out our comprehensive guides and tutorials
            </p>
            <a href="#" className="text-[#3b82f6] hover:text-[#2563eb] text-sm font-medium">
              Visit Docs →
            </a>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <p className="text-[#9ca3af] text-sm mb-3">
              Get help from our development team
            </p>
            <a href="#" className="text-[#3b82f6] hover:text-[#2563eb] text-sm font-medium">
              Contact Support →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;