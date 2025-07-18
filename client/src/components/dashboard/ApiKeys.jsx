import React, { useState, useEffect } from 'react';
import { Plus, Copy, Eye, EyeOff, Trash2, Edit, Calendar } from 'lucide-react';

const ApiKeys = () => {
  const [keys, setKeys] = useState([]);
  const [connectionUri, setConnectionUri] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  const toggleKeyVisibility = (id) => {
    setKeys(keys.map(key => 
      key.id === id ? { ...key, visible: !key.visible } : key
    ));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // In a real app, you'd show a toast notification here
  };

  const deleteKey = async (id) => {
  try {
    const response = await fetch(`https://backdevsai.onrender.com/api/key/delete/${id}`, {
      method: 'DELETE',
      credentials: 'include', // to send cookies if using auth middleware
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to delete key");
      return;
    }

    // remove from state
    setKeys(keys.filter(key => key._id !== id));
  } catch (error) {
    console.error("Error deleting key:", error);
    alert("Something went wrong while deleting the key.");
  }
};


const createNewKey = async () => {
  if (!newKeyName.trim() || !connectionUri.trim()) return;

  try {
    const response = await fetch('https://backdevsai.onrender.com/api/key/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newKeyName,
        connectionUri: connectionUri
      }),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Key creation failed");
      return;
    }

    setKeys([...keys, {
      id: keys.length + 1,
      name: data.apiKey.name,
      key: data.apiKey.key,
      created: new Date(data.apiKey.createdAt).toISOString().split("T")[0],
      lastUsed: 'Never',
      requests: 0,
      visible: false
    }]);

    setNewKeyName('');
    setConnectionUri('');
    setShowCreateModal(false);

  } catch (error) {
    console.error("API Key creation error:", error);
    alert("Something went wrong.");
  }
};

useEffect(() => {
  const fetchKeys = async () => {
    try {
      const response = await fetch("https://backdevsai.onrender.com/api/key/getmyapis", {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include"
      });

      const data = await response.json();
      console.log(data);
      setKeys(data.map((k, i) => ({
        id: i + 1,
        name: k.name,
        key: k.key,
        created: new Date(k.createdAt).toISOString().split("T")[0],
        lastUsed: 'Never', // You can update this based on actual field
        count: k.count,
        _id: k._id,
        visible: false
      })));
    } catch (err) {
      console.error("Failed to fetch API keys", err);
    }
  };

  fetchKeys();
}, []);


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">API Keys</h2>
          <p className="text-[#9ca3af]">Manage your API keys and monitor usage</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-[#3b82f6]/25 flex items-center mt-4 sm:mt-0"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Key
        </button>
      </div>

      {/* API Keys List */}
      <div className="space-y-4">
        {keys.map((key) => (
          <div
            key={key.id}
            className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-xl border border-[#1f2937] p-6 hover:border-[#3b82f6]/50 transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-xl font-semibold">{key.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    key.name === 'Production' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {key.name === 'Production' ? 'Live' : 'Test'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <code className="bg-[rgba(255,255,255,0.05)] px-3 py-1 rounded text-sm font-mono">
                    {key.visible ? key.key : '•'.repeat(20) + key.key.slice(-8)}
                  </code>
                  <button
                    onClick={() => toggleKeyVisibility(key.id)}
                    className="p-1 hover:bg-[rgba(255,255,255,0.1)] rounded transition-colors"
                  >
                    {key.visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => copyToClipboard(key.key)}
                    className="p-1 hover:bg-[rgba(255,255,255,0.1)] rounded transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-[#9ca3af]">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Created: {key.created}
                  </div>
                  <div>
                    Requests: {key.count}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                <button 
                  onClick={() => deleteKey(key._id)}
                  className="p-2 hover:bg-red-500/20 rounded transition-colors text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-xl border border-[#1f2937] p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Create New API Key</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Key Name</label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[#1f2937] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all duration-200"
                  placeholder="Enter key name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Connection URI</label>
                <input
                  type="text"
                  value={connectionUri}
                  onChange={(e) => setConnectionUri(e.target.value)}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[#1f2937] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all duration-200"
                  placeholder="e.g. https://api.example.com"
                />
              </div>

              
              <div className="flex space-x-3">
                <button
                  onClick={createNewKey}
                  className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb] text-white py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Create Key
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 border border-[#1f2937] hover:border-[#3b82f6] text-[#e5e5e5] py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeys;